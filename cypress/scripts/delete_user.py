# TODO - Need to work out where userpool and table environment names are coming from.
# Pass in environment as variable and have config in a file.

# TODO - Also need to consider permissions for how to run script
# boto3 session seems to work, will consider again when integrating to CLI.

import argparse
import boto3
import sys

session = boto3.session.Session(profile_name='cypress-test')
cognito = session.client('cognito-idp')
dynamodb = session.client('dynamodb')


def main(email, user_pool_id, table_name):
    delete_from_cognito(email, user_pool_id)

    user_id = user_in_db(email, table_name)
    delete_from_db(user_id, table_name)

    print("Deleted user: " + email)
    return True


def delete_from_cognito(email, user_pool_id):
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


def user_in_db(email, table_name):
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


def delete_from_db(userId, table_name):
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
    # Add userpool and table names as arguments
    args = parser.parse_args()
    main(args.email, 'eu-west-1_vqox9Z8q7', 'lists-test')
