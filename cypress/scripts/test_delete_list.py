import pytest
import boto3
from moto import mock_dynamodb2
import delete_list


@pytest.fixture
def dynamodb_mock():
    with mock_dynamodb2():
        dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')

        table = dynamodb.create_table(
            TableName='lists-unittest',
            KeySchema=[{'AttributeName': 'PK', 'KeyType': 'HASH'}, {'AttributeName': 'SK', 'KeyType': 'RANGE'}],
            AttributeDefinitions=[
                {'AttributeName': 'PK', 'AttributeType': 'S'},
                {'AttributeName': 'SK', 'AttributeType': 'S'}
            ],
            ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5},
        )

        items = [
            {
                "PK": "LIST#12345678-list-0001-1234-abcdefghijkl",
                "SK": "USER#12345678-user-0001-1234-abcdefghijkl",
                "userId": "12345678-user-0001-1234-abcdefghijkl",
                "title": "Child User1 1st Birthday",
                "occasion": "Birthday",
                "listId": "12345678-list-0001-1234-abcdefghijkl",
                "createdAt": "1573739584",
                "description": "A gift list for Child User1 birthday.",
                "eventDate": "31 October 2018",
                "imageUrl": "/images/celebration-default.jpg",
                "state": "open"
            }
        ]

        for item in items:
            table.put_item(TableName='lists-unittest', Item=item)

        yield


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
        assert delete_list.delete('12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl', 'lists-unittest')

    def test_delete_list_does_not_exist(self, dynamodb_mock):
        assert delete_list.delete('12345678-list-miss-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl', 'lists-unittest')

    def test_delete_list_error(self, dynamodb_mock):
        with pytest.raises(SystemExit) as e:
            delete_list.delete('12345678-list-0001-1234-abcdefghijkl', '12345678-user-0001-1234-abcdefghijkl', 'lists-unittes')

        assert e.type == SystemExit
        assert e.value.code == 1
