import pytest
import delete_list


class TestMain:
    def test_delete_list(self, dynamodb_mock):
        assert delete_list.main('12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl', 'lists-unittest')

    def test_delete_fails_with_error(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            delete_list.main('12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl', 'lists-unittes')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestDeleteList:
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
        assert delete_list.delete(items, 'lists-unittest')

    def test_delete_list_no_items(self, dynamodb_mock):
        assert delete_list.delete([], 'lists-unittest')

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
            delete_list.delete(items, 'lists-unittes')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestGetListItems:
    def test_get_list_items(self, dynamodb_mock):
        items = delete_list.get_list_items('12345678-list-0001-1234-abcdefghijkl', 'lists-unittest')
        assert len(items) == 2

    def test_get_list_when_does_not_exist(self, dynamodb_mock):
        items = delete_list.get_list_items('12345678-list-9999-1234-abcdefghijkl', 'lists-unittest')
        assert len(items) == 0

    def test_get_list_items_error(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            delete_list.get_list_items('12345678-list-9999-1234-abcdefghijkl', 'lists-wrong')

        assert e.type == SystemExit
        assert e.value.code == 1
