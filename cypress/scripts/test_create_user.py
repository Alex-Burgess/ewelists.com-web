import pytest
import boto3
import mock
import create_user


@pytest.fixture
def user_pool_id():
    client = boto3.client('cognito-idp', region_name='eu-west-1')
    list_response = client.list_user_pools(MaxResults=1)
    id = list_response['UserPools'][0]['Id']
    return id


@mock.patch("create_user.set_password", mock.MagicMock(return_value=[True]))
class TestCreateUser:
    def test_create_user(self, capsys, cognito_mock, user_pool_id):
        assert create_user.main('new.user1@gmail.com', 'New User1', user_pool_id)
        captured = capsys.readouterr()
        assert captured.out == "new.user1@gmail.com\n"

    def test_create_fails_in_cognito(self, cognito_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            create_user.main('test.exists@gmail.com', 'Test Exists', user_pool_id)

        assert e.type == SystemExit
        assert e.value.code == 1


class TestCreateInCognito:
    def test_create_success(self, cognito_mock, user_pool_id):
        assert create_user.create_in_cognito('new.user1@gmail.com', 'New User1', user_pool_id)

    def test_create_fails(self, cognito_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            create_user.create_in_cognito('test.exists@gmail.com', 'Test Exists', user_pool_id)

        assert e.type == SystemExit
        assert e.value.code == 1

    def test_create_errors(self, cognito_mock):
        with pytest.raises(SystemExit) as e:
            create_user.create_in_cognito('new.user1@gmail.com', 'New User1', 'eu-west-1_12345678')

        assert e.type == SystemExit
        assert e.value.code == 1


@pytest.mark.skip(reason="The admin_set_user_password action has not been implemented")
class TestSetPassword:
    def test_set_password(self, cognito_mock, user_pool_id):
        assert create_user.set_password('test.exists@gmail.com', user_pool_id)
