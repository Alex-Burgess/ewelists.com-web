import argparse
import common
import sys


def main(email, user_pool_id, table_name, profile=None):
    delete_from_cognito(email, user_pool_id, profile)

    user_id = user_in_db(email, table_name, profile)
    delete_from_db(user_id, table_name, profile)

    print("Deleted user: " + email)
    return True


def delete_from_cognito(email, user_pool_id, profile=None):
    cognito = common.cognito_session(profile)

    try:
        cognito.admin_delete_user(
            UserPoolId=user_pool_id,
            Username=email
        )
    except Exception as e:
        print('ERROR: User could not be deleted from cognito userpool.',
              'error = ' + str(e),
              'userpool = ' + user_pool_id,
              'email = ' + email,
              sep="\n  "
              )
        sys.exit(1)

    return True


def user_in_db(email, table_name, profile=None):
    dynamodb = common.dynamodb_session(profile)

    try:
        response = dynamodb.query(
            TableName=table_name,
            IndexName='email-index',
            KeyConditionExpression="email = :email",
            ExpressionAttributeValues={":email":  {'S': email}}
        )
    except Exception as e:
        print('ERROR: Unexpected error querying for users email in table.',
              'error = ' + str(e),
              'table = ' + table_name,
              'email = ' + email,
              sep="\n  "
              )
        sys.exit(1)

    for item in response['Items']:
        if item['PK']['S'].startswith("USER"):
            return item['userId']['S']

    print('ERROR: Users email could not be found in table.',
          'table = ' + table_name,
          'email = ' + email,
          sep="\n  "
          )
    sys.exit(1)


def delete_from_db(userId, table_name, profile=None):
    dynamodb = common.dynamodb_session(profile)

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
        print('ERROR: Unexpected error when deleting user from table.',
              'error = ' + str(e),
              'table = ' + table_name,
              'userId = ' + userId,
              sep="\n  "
              )
        sys.exit(1)

    return True


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Delete test user in cognito and lists table.')
    parser.add_argument('-e', '--email', help='users email', required=True)
    parser.add_argument('-U', '--user_pool', help='userpool id', required=True)
    parser.add_argument('-t', '--table', help='table name', required=True)
    parser.add_argument('-P', '--profile', help='local user profile', required=False)
    args = parser.parse_args()
    main(args.email, args.user_pool, args.table, args.profile)
