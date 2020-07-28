# TODO - Need to work out where userpool and table environment names are coming from.
# Pass in environment as variable and have config in a file.

# TODO - Also need to consider permissions for how to run script
# boto3 session seems to work, will consider again when integrating to CLI.

import argparse
import boto3
import sys
import uuid

session = boto3.session.Session(profile_name='cypress-test')
dynamodb = session.client('dynamodb')


def main(user_id, table_name):
    list_id = create(user_id, table_name)

    print(list_id)
    return True


def create(user_id, table_name):
    list_id = str(uuid.uuid4())

    item = {
        'PK': {'S': "LIST#{}".format(list_id)},
        'SK': {'S': "USER#{}".format(user_id)},
        'listId': {'S': list_id},
        'userId': {'S': user_id},
        'title': {'S': 'Baby Gift List'},
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
    args = parser.parse_args()
    main(args.user, 'lists-test')
