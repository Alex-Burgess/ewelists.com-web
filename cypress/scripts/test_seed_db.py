import pytest
import json
import mock
import seed_db


@mock.patch("seed_db.set_password", mock.MagicMock(return_value=[True]))
class TestSeedDb:
    def test_seed_fixture(self, dynamodb_mock, cognito_mock, user_pool_id, capsys):
        assert seed_db.main(
            user_pool_id,
            'lists-unittest',
            'notfound-unittest',
            'products-unittest',
            'data_fixture.json'
        )
        captured = capsys.readouterr()
        returned_json = json.loads(captured.out.strip('\n'))

        assert returned_json['user_id'] == 'test.user@gmail.com'
        assert len(returned_json['list_id']) == 36
        assert len(returned_json['product_ids']) == 3
        assert len(returned_json['reservation_ids']) == 2


class TestHandleProducts:
    def test_add_products(self, dynamodb_mock, example_fixture):
        product_ids, reservation_ids = seed_db.handle_products('lists-unittest', 'notfound-unittest', 'products-unittest', '12345678-user-0001-1234-abcdefghijkl', '12345678-list-0001-1234-abcdefghijkl', example_fixture)
        assert len(product_ids[0]) == 36
        assert len(product_ids[1]) == 36
        assert len(product_ids[2]) == 36
        assert len(reservation_ids[0]) == 36
        assert len(reservation_ids[1]) == 36


class TestCreateReservationItem:
    def test_create_reservation_item(self, dynamodb_mock):
        reservation_data = {
            "userId": "12345678-test-user-r001-abcdefghijkl",
            "name": "Cypress TestReserver",
            "email": "eweuser8+testreserver@gmail.com",
            "quantity": 1,
            "state": "reserved",
            "reservedAt": "1573739584"
        }

        assert seed_db.create_reservation_item(
            'lists-unittest',
            '12345678-list-0001-1234-abcdefghijkl',
            '12345678-user-0001-1234-abcdefghijkl',
            '12345678-prod-0001-1234-abcdefghijkl',
            'A test wish list',
            'products',
            reservation_data
        )


class TestCreateProductListItem:
    def test_create_product_list_item(self, dynamodb_mock, notfound_product):
        assert seed_db.create_product_list_item('lists-unittest', '12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl', notfound_product)

    def test_create_product_list_item_with_notes(self, dynamodb_mock, notfound_product):
        notfound_product['notes'] = "Custom user notes"
        assert seed_db.create_product_list_item('lists-unittest', '12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl', notfound_product)

    def test_bad_product(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            seed_db.create_product_list_item('wrong-unittest', '12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl', {})

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_add_error(self, dynamodb_mock, notfound_product):
        with pytest.raises(SystemExit) as e:
            seed_db.create_product_list_item('wrong-unittest', '12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl', notfound_product)

        assert e.type == SystemExit
        assert e.value.code == 1


class TestCreateProduct:
    def test_create_notfound(self, dynamodb_mock, notfound_product):
        product_id = seed_db.create_product('notfound-unittest', 'products-unittest', '12345678-user-0001-1234-abcdefghijkl', notfound_product)
        assert len(product_id) == 36

    def test_create_product(self, dynamodb_mock, products_product):
        product_id = seed_db.create_product('notfound-unittest', 'products-unittest', '12345678-user-0001-1234-abcdefghijkl', products_product)
        assert len(product_id) == 36

    def test_create_product_with_wrong_table(self, dynamodb_mock, products_product):
        with pytest.raises(SystemExit) as e:
            seed_db.create_product('notfound-unittest', 'wrong-unittest', '12345678-user-0001-1234-abcdefghijkl', products_product)
        assert e.type == SystemExit
        assert e.value.code == 1

    def test_create_notfound_with_wrong_table(self, dynamodb_mock, notfound_product):
        with pytest.raises(SystemExit) as e:
            seed_db.create_product('wrong-unittest', 'products-unittest', '12345678-user-0001-1234-abcdefghijkl', notfound_product)
        assert e.type == SystemExit
        assert e.value.code == 1

    def test_wrong_table_type_errors(self, dynamodb_mock, notfound_product):
        notfound_product['type'] = 'bad'
        with pytest.raises(SystemExit) as e:
            seed_db.create_product('notfound-unittest', 'products-unittest', '12345678-user-0001-1234-abcdefghijkl', notfound_product)

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_missing_product_data(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            seed_db.create_product('notfound-unittest', 'products-unittest', '12345678-user-0001-1234-abcdefghijkl', {})

        assert e.type == SystemExit
        assert e.value.code == 1


class TestCreateList:
    def test_create_successful(self, dynamodb_mock, example_fixture):
        list_id = seed_db.create_list('12345678-user-0001-1234-abcdefghijkl', example_fixture, 'lists-unittest')
        assert len(list_id) == 36

    def test_create_fixture_wrong(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            seed_db.create_list('12345678-user-0001-1234-abcdefghijkl', {}, 'lists-unittes')

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_create_list_error(self, dynamodb_mock, example_fixture):
        with pytest.raises(SystemExit) as e:
            seed_db.create_list('12345678-user-0001-1234-abcdefghijkl', example_fixture, 'lists-unittes')

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_check_image_url_staging(self):
        imageUrl = seed_db.check_image('/images/babyshower-default.jpg', 'blah-staging')
        assert imageUrl == '/images/babyshower-default.jpg'

    def test_check_image_url_test(self):
        imageUrl = seed_db.check_image('/images/babyshower-default.jpg', 'blah-test')
        assert imageUrl == 'https://test.ewelists.com/images/babyshower-default.jpg'


@mock.patch("seed_db.set_password", mock.MagicMock(return_value=[True]))
class TestCreateUser:
    def test_create_user(self, dynamodb_mock, cognito_mock, user_pool_id, example_fixture):
        user_id = seed_db.create_user(example_fixture, user_pool_id)
        assert user_id == 'test.user@gmail.com'

    def test_user_fixture_wrong(self, dynamodb_mock, cognito_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            seed_db.create_user({}, user_pool_id)

        assert e.type == SystemExit
        assert e.value.code == 1


class TestCreateInCognito:
    def test_create_success(self, cognito_mock, user_pool_id):
        assert seed_db.create_in_cognito('new.user1@gmail.com', 'New User1', user_pool_id)

    def test_create_fails(self, cognito_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            seed_db.create_in_cognito('test.exists@gmail.com', 'Test Exists', user_pool_id)

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_create_errors(self, cognito_mock):
        with pytest.raises(SystemExit) as e:
            seed_db.create_in_cognito('new.user1@gmail.com', 'New User1', 'eu-west-1_12345678')

        assert e.type == SystemExit
        assert e.value.code == 1


@pytest.mark.skip(reason="The admin_set_user_password action has not been implemented")
class TestSetPassword:
    def test_set_password(self, cognito_mock, user_pool_id):
        assert seed_db.set_password('test.exists@gmail.com', user_pool_id)


class TestGetFixture:
    def test_get_fixture(self, example_fixture):
        product = seed_db.get_fixture('data_fixture.json')
        assert product == example_fixture

    def test_get_missing_fixture(self, example_fixture):
        with pytest.raises(SystemExit) as e:
            seed_db.get_fixture('missing.json')

        assert e.type == SystemExit
        assert e.value.code == 1


def test_error(capsys):
    with pytest.raises(SystemExit) as e:
        seed_db.error('An error', e)

    print("error: " + str(e))

    assert e.type == SystemExit
    assert e.value.code == 1

    captured = capsys.readouterr()
    rows = captured.out.split("\n")
    assert rows[0] == "ERROR: An error"
