# TODO - Need to work out where userpool and table environment names are coming from.
# Pass in environment as variable and have config in a file.

# TODO - Also need to consider permissions for how to run script
# boto3 session seems to work, will consider again when integrating to CLI.

import argparse
import boto3
import sys

session = boto3.session.Session(profile_name='cypress-test')
dynamodb = session.client('dynamodb')


def main(list_id, user_id, table_name):
    delete(list_id, user_id, table_name)

    print("Deleted list: " + list_id)
    return True


def delete(list_id, user_id, table_name):
    key = {
        'PK': {'S': 'LIST#' + list_id},
        'SK': {'S': 'USER#' + user_id}
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
              'userId = ' + user_id,
              sep="\n  "
              )
        sys.exit(1)

    return True


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Delete test list from lists table.')
    parser.add_argument('-l', '--list', help='list ID', required=True)
    parser.add_argument('-u', '--user', help='user ID', required=True)
    args = parser.parse_args()
    main(args.list, args.user, 'lists-test')
