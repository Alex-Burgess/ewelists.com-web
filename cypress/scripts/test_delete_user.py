import pytest
import boto3
import delete_user


@pytest.fixture
def user_pool_id():
    client = boto3.client('cognito-idp', region_name='eu-west-1')
    list_response = client.list_user_pools(MaxResults=1)
    id = list_response['UserPools'][0]['Id']
    return id


class TestDeleteUser:
    def test_delete_user(self, cognito_mock, dynamodb_mock, user_pool_id):
        assert delete_user.main('test.exists@gmail.com', user_pool_id, 'lists-unittest')

    def test_delete_fails_in_cognito(self, cognito_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            delete_user.main('dummy@gmail.com', user_pool_id, 'lists-unittest')

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_delete_fails_in_dynamodb(self, cognito_mock, dynamodb_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            delete_user.main('test.onlycognito@gmail.com', user_pool_id, 'lists-unittest')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestDeleteFromCognito:
    def test_delete_successul(self, cognito_mock, user_pool_id):
        assert delete_user.delete_from_cognito('test.exists@gmail.com', user_pool_id)

    def test_delete_fails(self, cognito_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            delete_user.delete_from_cognito('dummy@gmail.com', user_pool_id)

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_delete_errors(self, cognito_mock):
        with pytest.raises(SystemExit) as e:
            delete_user.delete_from_cognito('dummy@gmail.com', 'eu-west-1_12345678')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestUserInDb:
    def test_user_in_db(self, dynamodb_mock):
        user_id = delete_user.user_in_db('test.exists@gmail.com', 'lists-unittest')
        assert user_id == "12345678-user-0001-1234-abcdefghijkl"

    def test_user_not_in_db(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            delete_user.user_in_db('dummy@gmail.com', 'lists-unittest')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestDeleteFromDb:
    def test_delete_successful(self, dynamodb_mock):
        assert delete_user.delete_from_db('12345678-user-0001-1234-abcdefghijkl', 'lists-unittest')

    def test_delete_with_missing_user(self, dynamodb_mock):
        # Even though the user does not exist, delete operation succeeds.
        assert delete_user.delete_from_db('12345678-miss-0001-1234-abcdefghijkl', 'lists-unittest')

    def test_delete_errors(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            delete_user.delete_from_db('12345678-miss-0001-1234-abcdefghijkl', 'lists-unittes')

        assert e.type == SystemExit
        assert e.value.code == 1
