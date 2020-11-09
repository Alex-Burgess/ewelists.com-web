import argparse
import sys
import uuid
import json
import boto3

local_profile = None


def main(user_pool_id, lists_table, notfound_table, products_table, fixture, profile=None):
    # set local profile
    global local_profile
    local_profile = profile

    response_data = {}

    data = get_fixture(fixture)

    if 'user' in data:
        user_id = create_user(data, user_pool_id)
        response_data['user_id'] = user_id

    if 'list' in data:
        list_id = create_list(user_id, data, lists_table)
        response_data['list_id'] = list_id

    if 'products' in data:
        product_ids, reservation_ids = handle_products(lists_table, notfound_table, products_table, user_id, list_id, data)
        response_data['product_ids'] = product_ids
        response_data['reservation_ids'] = reservation_ids

    print(json.dumps(response_data))
    return True


def handle_products(lists_table, notfound_table, products_table, user_id, list_id, data):
    products = []
    reservations = []

    for product in data['products']:
        product_id = create_product(notfound_table, products_table, user_id, product)

        # If there is no quantity, we will create the product but not add it to the list
        if 'quantity' in product:
            create_product_list_item(lists_table, list_id, product_id, product)

        products.append(product_id)

        if 'reservations' in product:
            for reservation in product['reservations']:
                reservation_id = create_reservation_item(lists_table, list_id, user_id, product_id, data['list']['title'], product['type'], reservation)
                reservations.append(reservation_id)

    return products, reservations


def create_reservation_item(table_name, list_id, list_owner_id, product_id, title, type, reservation_data):
    dynamodb = dynamodb_session()
    resv_id = str(uuid.uuid4())

    try:
        item = {
            'PK': {'S': "LIST#{}".format(list_id)},
            'SK': {'S': "RESERVATION#{}#{}#{}".format(product_id, reservation_data['userId'], resv_id)},
            'reservationId': {'S': resv_id},
            'productId': {'S': product_id},
            'userId': {'S': reservation_data['userId']},
            'listId': {'S': list_id},
            'listOwnerId': {'S': list_owner_id},
            'name': {'S': reservation_data['name']},
            'email': {'S': reservation_data['email']},
            'quantity': {'N': str(reservation_data['quantity'])},
            'state': {'S': reservation_data['state']},
            'reservedAt': {'N': reservation_data['reservedAt']},
            'listTitle': {'S': title},
            'productType': {'S': type}
        }
    except Exception as e:
        error("list data in fixture was not as expected", e)

    try:
        dynamodb.put_item(TableName=table_name, Item=item)
    except Exception as e:
        error("Unexpected error when creating reservation in table (" + table_name + ")", e)

    return resv_id


def create_product_list_item(table, list_id, product_id, product):
    dynamodb = dynamodb_session()

    try:
        item = {
            "PK": {'S': 'LIST#' + list_id},
            "SK": {'S': 'PRODUCT#' + product_id},
            "type": {'S': product['type']},
            "purchased": {'N': str(product['purchased'])},
            "quantity": {'N': str(product['quantity'])},
            "reserved": {'N': str(product['reserved'])}
        }

        if 'notes' in product:
            item['notes'] = {'S': product['notes']}
    except Exception as e:
        error("The product json object was not correct.", e)

    try:
        dynamodb.put_item(TableName=table, Item=item)
    except Exception as e:
        error("Unexpected error when adding product to list (" + table + ")", e)

    return True


def create_product(notfound_table, products_table, user_id, product):
    dynamodb = dynamodb_session()

    product_id = str(uuid.uuid4())

    try:
        if product['type'] == 'notfound':
            table = notfound_table

            item = {
                "productId": {'S': product_id},
                "brand": {'S': product['brand']},
                "details": {'S': product['details']},
                "productUrl": {'S': product['productUrl']},
                "createdBy": {'S': user_id}
            }
        elif product['type'] == 'products':
            table = products_table

            item = {
                "productId": {'S': product_id},
                "brand": {'S': product['brand']},
                "retailer": {'S': product['retailer']},
                "price": {'S': product['price']},
                "priceCheckedDate": {'S': "2020-08-27 16:00:00"},
                "details": {'S': product['details']},
                "productUrl": {'S': product['productUrl']},
                "imageUrl": {'S': product['imageUrl']}
            }
        else:
            error("The product json object did not have a valid type.", 'type')
    except Exception as e:
        error("The product json object was not correct.", e)

    try:
        dynamodb.put_item(TableName=table, Item=item)
    except Exception as e:
        error("Unexpected error when creating product in table (" + table + ")", e)

    return product_id


def create_list(user_id, data, table_name):
    dynamodb = dynamodb_session()

    list_id = str(uuid.uuid4())

    try:
        item = {
            'PK': {'S': "LIST#{}".format(list_id)},
            'SK': {'S': "USER#{}".format(user_id)},
            'listId': {'S': list_id},
            'userId': {'S': user_id},
            'title': {'S': data['list']['title']},
            'occasion': {'S': data['list']['occasion']},
            'description': {'S': data['list']['description']},
            'createdAt': {'N': data['list']['createdAt']},
            'imageUrl': {'S': check_image(data['list']['imageUrl'], table_name)},
            'state': {'S': 'open'},
            'eventDate': {'S': data['list']['eventDate']}
        }
    except Exception as e:
        error("list data in fixture was not as expected", e)

    try:
        dynamodb.put_item(TableName=table_name, Item=item)
    except Exception as e:
        error("Unexpected error when creating list in table (" + table_name + ")", e)

    return list_id


def check_image(image_url, table_name):
    if 'test' in table_name:
        image_url = 'https://test.ewelists.com' + image_url

    return image_url


def create_user(data, user_pool_id):
    try:
        email = data['user']['email']
        name = data['user']['name']
        password = data['user']['password']
    except Exception as e:
        error("user data in fixture was not as expected", e)

    user_id = create_in_cognito(email, name, user_pool_id)
    set_password(email, password, user_pool_id)
    return user_id


def create_in_cognito(email, name, user_pool_id):
    cognito = cognito_session()

    try:
        response = cognito.admin_create_user(
            UserPoolId=user_pool_id,
            Username=email,
            UserAttributes=[
                {'Name': 'email', 'Value': email},
                {'Name': 'name', 'Value': name},
            ],
            MessageAction='SUPPRESS',
        )
    except Exception as e:
        error("User could not be created in cognito userpool (" + user_pool_id + ")", e)

    return response['User']['Username']


def set_password(email, password, user_pool_id):
    cognito = cognito_session()

    try:
        cognito.admin_set_user_password(
            UserPoolId=user_pool_id,
            Username=email,
            Password=password,
            Permanent=True
        )

        cognito.admin_update_user_attributes(
            UserPoolId=user_pool_id,
            Username=email,
            UserAttributes=[{'Name': 'email_verified', 'Value': 'true'}]
        )
    except Exception as e:
        error("Password could not be set for user in cognito userpool (" + user_pool_id + ")", e)

    return True


def get_fixture(path):
    try:
        with open(path) as json_file:
            data = json.load(json_file)
    except Exception as e:
        error("Unexpected error when opening fixture file", e)

    return data


def error(message, e):
    print('ERROR: ' + message,
          'error = ' + str(e),
          sep="\n  "
          )
    sys.exit(1)


def cognito_session():
    if local_profile:
        session = boto3.session.Session(profile_name=local_profile)
        cognito = session.client('cognito-idp')
        return cognito

    cognito = boto3.client('cognito-idp')
    return cognito


def dynamodb_session():
    if local_profile:
        session = boto3.session.Session(profile_name=local_profile)
        dynamodb = session.client('dynamodb')
        return dynamodb

    dynamodb = boto3.client('dynamodb')
    return dynamodb


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Seeds data in the databases from a fixture file of given tempalte.')
    parser.add_argument('-P', '--profile', help='local user profile', required=False)
    parser.add_argument('-u', '--user_pool_id', help='cognito user pool', required=True)
    parser.add_argument('-l', '--lists_table', help='lists table name', required=True)
    parser.add_argument('-n', '--notfound_table', help='notfound and products table name', required=True)
    parser.add_argument('-p', '--products_table', help='user ID', required=True)
    parser.add_argument('-f', '--fixture', help='Path to fixture containing json object for product', required=True)
    args = parser.parse_args()
    main(args.user_pool_id, args.lists_table, args.notfound_table, args.products_table, args.fixture, args.profile)
