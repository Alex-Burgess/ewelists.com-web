import argparse
import common
import sys


def main(list_id, user_id, table_name, profile=None):
    items = get_list_items(list_id, table_name, profile)

    delete(items, table_name, profile)

    print("Deleted list: " + list_id)
    return True


def delete(items, table_name, profile=None):
    dynamodb = common.dynamodb_session(profile)

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
            print('ERROR: Unexpected error when deleting list items from table.',
                  'error = ' + str(e),
                  'table = ' + table_name,
                  sep="\n  "
                  )
            sys.exit(1)

    return True


def get_list_items(list_id, table_name, profile=None):
    dynamodb = common.dynamodb_session(profile)

    try:
        response = dynamodb.query(
            TableName=table_name,
            KeyConditionExpression="PK = :PK",
            ExpressionAttributeValues={":PK":  {'S': "LIST#{}".format(list_id)}}
        )
    except Exception as e:
        print('ERROR: Unexpected error when getting list items from table.',
              'error = ' + str(e),
              'table = ' + table_name,
              'listId = ' + list_id,
              sep="\n  "
              )
        sys.exit(1)

    return response['Items']


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Delete test list from lists table.')
    parser.add_argument('-l', '--list', help='list ID', required=True)
    parser.add_argument('-u', '--user', help='user ID', required=True)
    parser.add_argument('-t', '--table', help='table name', required=True)
    parser.add_argument('-P', '--profile', help='local user profile', required=False)
    args = parser.parse_args()
    main(args.list, args.user, args.table, args.profile)
