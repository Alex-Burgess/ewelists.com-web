import pytest
import boto3
import mock
from moto import mock_cognitoidp, mock_dynamodb2
import create_user


@pytest.fixture
def cognito_mock():
    with mock_cognitoidp():
        client = boto3.client('cognito-idp', region_name='eu-west-1')

        user_pool_id = client.create_user_pool(PoolName='ewelists-unittest')["UserPool"]["Id"]

        client.admin_create_user(
            UserPoolId=user_pool_id,
            # Mock implementation does not work quite the same as real implementation.
            # In real implemenation can delete user with either sub or email.
            # Username=str(uuid.uuid4()),
            Username='test.existsC@gmail.com',
            UserAttributes=[{"Name": "email", "Value": 'test.exists@gmail.com'}]
        )

        client.admin_create_user(
            UserPoolId=user_pool_id,
            Username='test.onlycognito@gmail.com',
            UserAttributes=[{"Name": "email", "Value": 'test.exists@gmail.com'}]
        )

        yield


@pytest.fixture
def dynamodb_mock():
    with mock_dynamodb2():
        dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')

        table = dynamodb.create_table(
            TableName='lists-unittest',
            KeySchema=[{'AttributeName': 'PK', 'KeyType': 'HASH'}, {'AttributeName': 'SK', 'KeyType': 'RANGE'}],
            AttributeDefinitions=[
                {'AttributeName': 'PK', 'AttributeType': 'S'},
                {'AttributeName': 'SK', 'AttributeType': 'S'},
                {'AttributeName': 'email', 'AttributeType': 'S'}
            ],
            ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5},
            GlobalSecondaryIndexes=[
                {
                    'IndexName': 'email-index',
                    'KeySchema': [{'AttributeName': 'email', 'KeyType': 'HASH'}, {'AttributeName': 'PK', 'KeyType': 'RANGE'}],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    }
                }
            ]
        )

        items = [
            {
                "PK": "USER#12345678-user-0001-1234-abcdefghijkl",
                "SK": "USER#12345678-user-0001-1234-abcdefghijkl",
                "email": "test.existsD@gmail.com",
                "name": "Test User1",
                "userId": "12345678-user-0001-1234-abcdefghijkl"
            }
        ]

        for item in items:
            table.put_item(TableName='lists-unittest', Item=item)

        yield


@pytest.fixture
def user_pool_id():
    client = boto3.client('cognito-idp', region_name='eu-west-1')
    list_response = client.list_user_pools(MaxResults=1)
    id = list_response['UserPools'][0]['Id']
    return id


@mock.patch("create_user.set_password", mock.MagicMock(return_value=[True]))
class TestCreateUser:
    def test_create_user(self, capsys, cognito_mock, dynamodb_mock, user_pool_id):
        assert create_user.main('new.user1@gmail.com', 'New User1', user_pool_id, 'lists-unittest')
        captured = capsys.readouterr()
        assert captured.out == "new.user1@gmail.com\n"

    def test_create_fails_in_cognito(self, cognito_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            create_user.main('test.existsC@gmail.com', 'Test Exists', user_pool_id, 'lists-unittest')

        assert e.type == SystemExit
        assert e.value.code == 1


class TestCreateInCognito:
    def test_create_success(self, cognito_mock, user_pool_id):
        assert create_user.create_in_cognito('new.user1@gmail.com', 'New User1', user_pool_id)

    def test_create_fails(self, cognito_mock, user_pool_id):
        with pytest.raises(SystemExit) as e:
            create_user.create_in_cognito('test.existsC@gmail.com', 'Test Exists', user_pool_id)

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
        assert create_user.set_password('test.existsC@gmail.com', user_pool_id)
