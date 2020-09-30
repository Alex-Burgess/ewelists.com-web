import pytest
import json
import clean_db


@pytest.fixture
def delete_data():
    return json.dumps({
      "user_email": "test.exists@gmail.com",
      "list_id": "12345678-list-0001-1234-abcdefghijkl",
      "product_ids": [
        "12345678-prod-0010-1234-abcdefghijkl",
        "12345678-notf-0001-1234-abcdefghijkl"
      ]
    })


class TestCleanDb:
    def test_delete_user(self, dynamodb_mock, cognito_mock, user_pool_id, delete_data, capsys):
        assert clean_db.main(
            user_pool_id,
            'lists-unittest',
            'notfound-unittest',
            'products-unittest',
            delete_data
        )
        captured = capsys.readouterr()
        rows = captured.out.split("\n")

        assert rows[0] == "Deleted user: test.exists@gmail.com"
        assert rows[1] == "Deleted list: 12345678-list-0001-1234-abcdefghijkl"
        assert rows[2] == "Deleted product: 12345678-prod-0010-1234-abcdefghijkl"
        assert rows[3] == "Deleted product: 12345678-notf-0001-1234-abcdefghijkl"


class TestDeleteProducts:
    def test_delete_products(self, dynamodb_mock):
        ids = [
            "12345678-prod-0010-1234-abcdefghijkl",
            "12345678-notf-0001-1234-abcdefghijkl"
        ]
        assert clean_db.delete_products('notfound-unittest', 'products-unittest', ids)


class TestDeleteFromTable:
    def test_delete_successful(self, dynamodb_mock):
        assert clean_db.delete_product_from_table('12345678-prod-0010-1234-abcdefghijkl', 'products-unittest')

    def test_delete_product_that_does_not_exist(self, dynamodb_mock):
        assert clean_db.delete_product_from_table('12345678-prod-miss-1234-abcdefghijkl', 'products-unittest')

    def test_delete_errors(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            clean_db.delete_product_from_table('12345678-prod-0010-1234-abcdefghijkl', 'products-wrong')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestDeleteList:
    def test_delete_list(self, dynamodb_mock):
        assert clean_db.delete_list('12345678-list-0001-1234-abcdefghijkl', 'lists-unittest')

    def test_delete_successful(self, dynamodb_mock):
        items = [
            {
                "PK": {'S': "LIST#12345678-list-0001-1234-abcdefghijkl"},
                "SK": {'S': "USER#12345678-user-0001-1234-abcdefghijkl"},
                "userId": {'S': "12345678-user-0001-1234-abcdefghijkl"},
                "title": {'S': "Child User1 1st Birthday"},
                "occasion": {'S': "Birthday"},
                "listId": {'S': "12345678-list-0001-1234-abcdefghijkl"},
                "listOwner": {'S': "12345678-user-0001-1234-abcdefghijkl"},
                "createdAt": {'S': "1573739584"},
                "description": {'S': "A gift list for Child User1 birthday."},
                "eventDate": {'S': "31 October 2018"},
                "imageUrl": {'S': "/images/celebration-default.jpg"}
            },
            {
                "PK": {'S': "LIST#12345678-list-0001-1234-abcdefghijkl"},
                "SK": {'S': "PRODUCT#12345678-prod-0001-1234-abcdefghijkl"},
                "quantity": {'N': '3'},
                "reserved": {'N': '2'},
                "purchased": {'N': '0'},
                "type": {'S': "products"}
            }
        ]
        assert clean_db.delete_list_items(items, 'lists-unittest')

    def test_delete_list_no_items(self, dynamodb_mock):
        assert clean_db.delete_list_items([], 'lists-unittest')

    def test_delete_list_error(self, dynamodb_mock):
        items = [
            {
                "PK": "LIST#12345678-list-0001-1234-abcdefghijkl",
                "SK": "USER#12345678-user-0001-1234-abcdefghijkl",
                "userId": "12345678-user-0001-1234-abcdefghijkl",
                "title": "Child User1 1st Birthday",
                "occasion": "Birthday",
                "listId": "12345678-list-0001-1234-abcdefghijkl",
                "listOwner": "12345678-user-0001-1234-abcdefghijkl",
                "createdAt": "1573739584",
                "description": "A gift list for Child User1 birthday.",
                "eventDate": "31 October 2018",
                "imageUrl": "/images/celebration-default.jpg"
            }
        ]
        with pytest.raises(SystemExit) as e:
            clean_db.delete_list_items(items, 'lists-unittes')

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_get_list_items(self, dynamodb_mock):
        items = clean_db.get_list_items('12345678-list-0001-1234-abcdefghijkl', 'lists-unittest')
        assert len(items) == 2

    def test_get_list_when_does_not_exist(self, dynamodb_mock):
        items = clean_db.get_list_items('12345678-list-9999-1234-abcdefghijkl', 'lists-unittest')
        assert len(items) == 0

    def test_get_list_items_error(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            clean_db.get_list_items('12345678-list-9999-1234-abcdefghijkl', 'lists-wrong')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestDeleteUser:
    def test_delete_cognito_successul(self, cognito_mock, user_pool_id):
        assert clean_db.delete_from_cognito('test.exists@gmail.com', user_pool_id)

    def test_delete_cognito_fails(self, cognito_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            clean_db.delete_from_cognito('dummy@gmail.com', user_pool_id)

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_delete_cognito_errors(self, cognito_mock):
        with pytest.raises(SystemExit) as e:
            clean_db.delete_from_cognito('dummy@gmail.com', 'eu-west-1_12345678')

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_user_in_db(self, dynamodb_mock):
        user_id = clean_db.user_in_db('test.exists@gmail.com', 'lists-unittest')
        assert user_id == "12345678-user-0001-1234-abcdefghijkl"

    def test_user_not_in_db(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            clean_db.user_in_db('dummy@gmail.com', 'lists-unittest')

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_delete_db_successful(self, dynamodb_mock):
        assert clean_db.delete_from_db('12345678-user-0001-1234-abcdefghijkl', 'lists-unittest')

    def test_delete_db_with_missing_user(self, dynamodb_mock):
        # Even though the user does not exist, delete operation succeeds.
        assert clean_db.delete_from_db('12345678-miss-0001-1234-abcdefghijkl', 'lists-unittest')

    def test_delete_db_errors(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            clean_db.delete_from_db('12345678-miss-0001-1234-abcdefghijkl', 'lists-unittes')

        assert e.type == SystemExit
        assert e.value.code == 1


def test_error(capsys):
    with pytest.raises(SystemExit) as e:
        clean_db.error('An error', e)

    print("error: " + str(e))

    assert e.type == SystemExit
    assert e.value.code == 1

    captured = capsys.readouterr()
    rows = captured.out.split("\n")
    assert rows[0] == "ERROR: An error"
