import argparse
import sys
import boto3
import json

local_profile = None


def main(user_pool_id, lists_table, notfound_table, products_table, data, profile=None):
    # set local profile
    global local_profile
    local_profile = profile

    data = json.loads(data)

    if 'user_email' in data:
        delete_user(data['user_email'], user_pool_id, lists_table)

    if 'list_id' in data:
        delete_list(data['list_id'], lists_table)

    if 'product_ids' in data:
        delete_products(notfound_table, products_table, data['product_ids'])

    return True


def delete_products(notfound_table, products_table, ids):
    for id in ids:
        delete_product_from_table(id, notfound_table)
        delete_product_from_table(id, products_table)
        print("Deleted product: " + id)

    return True


def delete_product_from_table(product_id, table_name):
    dynamodb = dynamodb_session()

    try:
        dynamodb.delete_item(
            TableName=table_name,
            Key={'productId': {'S': product_id}}
        )
    except Exception as e:
        error("Unexpected error when deleting product from table (" + table_name + ")", e)

    return True


def delete_list(list_id, table_name):
    items = get_list_items(list_id, table_name)
    delete_list_items(items, table_name)
    print("Deleted list: " + list_id)
    return True


def delete_list_items(items, table_name):
    dynamodb = dynamodb_session()

    for item in items:
        key = {
            'PK': item['PK'],
            'SK': item['SK']
        }

        try:
            dynamodb.delete_item(
                TableName=table_name,
                Key=key
            )
        except Exception as e:
            error("Unexpected error when deleting list items from table (" + table_name + ")", e)

    return True


def get_list_items(list_id, table_name):
    dynamodb = dynamodb_session()

    try:
        response = dynamodb.query(
            TableName=table_name,
            KeyConditionExpression="PK = :PK",
            ExpressionAttributeValues={":PK":  {'S': "LIST#{}".format(list_id)}}
        )
    except Exception as e:
        error("Unexpected error when getting list items from table (" + table_name + ")", e)

    return response['Items']


def delete_user(email, user_pool_id, table_name):
    delete_from_cognito(email, user_pool_id)

    user_id = user_in_db(email, table_name)
    delete_from_db(user_id, table_name)

    print("Deleted user: " + email)
    return True


def delete_from_cognito(email, user_pool_id):
    cognito = cognito_session()

    try:
        cognito.admin_delete_user(
            UserPoolId=user_pool_id,
            Username=email
        )
    except Exception as e:
        error("User could not be deleted from cognito userpool (" + user_pool_id + ")", e)

    return True


def user_in_db(email, table_name):
    dynamodb = dynamodb_session()

    try:
        response = dynamodb.query(
            TableName=table_name,
            IndexName='email-index',
            KeyConditionExpression="email = :email",
            ExpressionAttributeValues={":email":  {'S': email}}
        )
    except Exception as e:
        error("Unexpected error querying for users email in table (" + table_name + ")", e)

    for item in response['Items']:
        if item['PK']['S'].startswith("USER"):
            return item['userId']['S']

    error("Users email could not be found in table (" + table_name + ")", email)


def delete_from_db(userId, table_name):
    dynamodb = dynamodb_session()

    key = {
        'PK': {'S': 'USER#' + userId},
        'SK': {'S': 'USER#' + userId}
    }

    try:
        dynamodb.delete_item(
            TableName=table_name,
            Key=key
        )
    except Exception as e:
        error("Unexpected error when deleting user from table (" + table_name + ")", e)

    return True


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
    parser.add_argument('-d', '--data', help='Json object with ids to clean up', required=True)
    args = parser.parse_args()
    main(args.user_pool_id, args.lists_table, args.notfound_table, args.products_table, args.data, args.profile)
