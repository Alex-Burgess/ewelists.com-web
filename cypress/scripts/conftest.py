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
def user_pool_id():
    client = boto3.client('cognito-idp', region_name='eu-west-1')
    list_response = client.list_user_pools(MaxResults=1)
    id = list_response['UserPools'][0]['Id']
    return id


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

        items = [
            {
                "productId": "12345678-notf-0001-1234-abcdefghijkl",
                "brand": "John Lewis",
                "details": "Trike",
                "productUrl": "https://www.johnlewis.com/john-lewis-partners-my-first-wooden-trike/p4779147"
            }
        ]

        for item in items:
            table.put_item(TableName='notfound-unittest', Item=item)
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


@pytest.fixture
def example_fixture():
    return {
        "user": {
            "email": "test.user@gmail.com",
            "name": "Test User1",
            "password": "P4ssw0rd!"
        },
        "list": {
            "title": "Cypress Test Wish List",
            "occasion": "Birthday",
            "createdAt": "1573739584",
            "description": "A gift list for Cypress birthday.",
            "eventDate": "31 October 2018",
            "imageUrl": "/images/birthday-default.jpg"
        },
        "products": [
            {
                "brand": "John Lewis & Partners",
                "retailer": "johnlewis.com",
                "price": "9.00",
                "priceCheckedDate": "2020-08-27 16:00:00",
                "details": "Baby Sleeveless Organic GOTS Cotton Bodysuits, Pack of 5, White",
                "productUrl": "https://www.johnlewis.com/john-lewis-partners-baby-sleeveless-organic-gots-cotton-bodysuits-pack-of-5-white/p3182352",
                "imageUrl": "https://johnlewis.scene7.com/is/image/JohnLewis/002955092?$rsp-pdp-port-640$",
                "type": "products",
                "quantity": 2,
                "reserved": 2,
                "purchased": 0,
                "reservations": [
                  {
                    "userId": "12345678-test-user-r001-abcdefghijkl",
                    "name": "Cypress TestReserver",
                    "email": "eweuser8+testreserver@gmail.com",
                    "quantity": 1,
                    "state": "reserved",
                    "reservedAt": "1573739584"
                  },
                  {
                    "userId": "eweuser8+testreserver2@gmail.com",
                    "name": "Cypress TestReserver2",
                    "email": "eweuser8+testreserver2@gmail.com",
                    "quantity": 1,
                    "state": "reserved",
                    "reservedAt": "1573739584"
                  }
                ]
            },
            {
                "brand": "John Lewis",
                "details": "Trike",
                "productUrl": "https://www.johnlewis.com/john-lewis-partners-my-first-wooden-trike/p4779147",
                "type": "notfound",
                "quantity": 1,
                "reserved": 0,
                "purchased": 0
            },
            {
                "brand": "BABYBJÖRN",
                "retailer": "amazon.com",
                "price": "219.99",
                "priceCheckedDate": "2020-08-27 16:00:00",
                "details": "Travel Cot Easy Go, Anthracite, with transport bag",
                "productUrl": "https://www.amazon.co.uk/BABYBJ%C3%96RN-Travel-Easy-Anthracite-transport/dp/B07DJ5KX53/",
                "imageUrl": "//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07DJ5KX53&Format=_SL250_&ID=AsinImage&MarketPlace=GB&ServiceVersion=20070822&WS=1&tag=ewelists-21",
                "type": "products"
            }
        ]
    }


@pytest.fixture
def notfound_product():
    return {
        "brand": "John Lewis",
        "details": "Trike",
        "productUrl": "https://www.johnlewis.com/john-lewis-partners-my-first-wooden-trike/p4779147",
        "type": "notfound",
        "quantity": 1,
        "reserved": 0,
        "purchased": 0
    }


@pytest.fixture
def products_product():
    return {
        "brand": "Mini Micro",
        "retailer": "johnlewis.com",
        "price": "79.99",
        "details": "Scooter",
        "productUrl": "https://www.johnlewis.com/mini-micro-deluxe-scooter-2-5-years/aqua/p3567221",
        "imageUrl": "https://johnlewis.scene7.com/is/image/JohnLewis/235862595?$rsp-pdp-port-1440$",
        "type": "products",
        "quantity": 1,
        "reserved": 0,
        "purchased": 0
    }
