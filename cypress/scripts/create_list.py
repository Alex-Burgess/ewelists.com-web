import argparse
import common
import sys
import uuid


def main(user_id, table_name, profile=None):
    list_id = create(user_id, table_name, profile)

    print(list_id)
    return True


def create(user_id, table_name, profile=None):
    dynamodb = common.dynamodb_session(profile)

    list_id = str(uuid.uuid4())

    item = {
        'PK': {'S': "LIST#{}".format(list_id)},
        'SK': {'S': "USER#{}".format(user_id)},
        'listId': {'S': list_id},
        'userId': {'S': user_id},
        'title': {'S': 'Cypress Test Gift List'},
        'occasion': {'S': 'Baby Shower'},
        'description': {'S': 'A test list'},
        'createdAt': {'N': '1573739584'},
        'imageUrl': {'S': 'https://test.ewelists.com/images/babyshower-default.jpg'},
        # 'imageUrl': {'S': '/images/babyshower-default.jpg'},
        'state': {'S': 'open'},
        'eventDate': {'S': '31 October 2018'}
    }

    try:
        dynamodb.put_item(TableName=table_name, Item=item)
    except Exception as e:
        print('ERROR: Unexpected error when creating list in table.',
              'error = ' + str(e),
              'table = ' + table_name,
              'userId = ' + user_id,
              sep="\n  "
              )
        sys.exit(1)

    return list_id


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Create test list in lists table.')
    parser.add_argument('-u', '--user', help='user ID', required=True)
    parser.add_argument('-t', '--table', help='table name', required=True)
    parser.add_argument('-P', '--profile', help='local user profile', required=False)
    args = parser.parse_args()
    main(args.user, args.table, args.profile)
