import pytest
import boto3
from moto import mock_cognitoidp, mock_dynamodb2


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
            Username='test.exists@gmail.com',
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
                "email": "test.exists@gmail.com",
                "name": "Test User1",
                "userId": "12345678-user-0001-1234-abcdefghijkl"
            },
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
            },
            {
                "PK": "LIST#12345678-list-0001-1234-abcdefghijkl",
                "SK": "PRODUCT#12345678-prod-0001-1234-abcdefghijkl",
                "quantity": 3,
                "reserved": 2,
                "purchased": 0,
                "type": "products"
            }
        ]

        for item in items:
            table.put_item(TableName='lists-unittest', Item=item)

        # Create notfound table
        table = dynamodb.create_table(
            TableName='notfound-unittest',
            KeySchema=[{'AttributeName': 'productId', 'KeyType': 'HASH'}],
            AttributeDefinitions=[{'AttributeName': 'productId', 'AttributeType': 'S'}],
            ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
        )

        # items = []
        #
        # for item in items:
        #     table.put_item(TableName='notfound-unittest', Item=item)
        # End of notfound

        # Create products table
        table = dynamodb.create_table(
            TableName='products-unittest',
            KeySchema=[{'AttributeName': 'productId', 'KeyType': 'HASH'}],
            AttributeDefinitions=[{'AttributeName': 'productId', 'AttributeType': 'S'}],
            ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
        )

        items = [
            {
                "productId": "12345678-prod-0010-1234-abcdefghijkl",
                "brand": "John Lewis & Partners",
                "retailer": "johnlewis.com",
                "price": "9.00",
                "priceCheckedDate": "2020-08-27 16:00:00",
                "details": "Baby Sleeveless Organic GOTS Cotton Bodysuits, Pack of 5, White",
                "productUrl": "https://www.johnlewis.com/john-lewis-partners-baby-sleeveless-organic-gots-cotton-bodysuits-pack-of-5-white/p3182352",
                "imageUrl": "https://johnlewis.scene7.com/is/image/JohnLewis/002955092?$rsp-pdp-port-640$"
            }
        ]

        for item in items:
            table.put_item(TableName='products-unittest', Item=item)
        # End of products

        yield
