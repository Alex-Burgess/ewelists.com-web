import argparse
import sys
import common
import uuid
import json


def main(lists_table, gifts_table, list_id, user_id, fixture, quantity=None, profile=None):
    product = get_fixture(fixture)

    product_id = create_product(gifts_table, user_id, product, profile)

    type = get_type(gifts_table)

    add_to_list(lists_table, list_id, product_id, type, quantity, profile)

    print(product_id)
    return True


def get_fixture(path):
    try:
        with open(path) as json_file:
            data = json.load(json_file)
    except Exception as e:
        print('ERROR: Unexpected error when opening fixture file.',
              'error = ' + str(e),
              sep="\n  "
              )
        sys.exit(1)

    return data


def get_type(table):
    if 'notfound' in table:
        return 'notfound'
    elif 'products' in table:
        return 'products'
    else:
        print('ERROR: The gifts table was not a notfound and products table.',
              'table = ' + table,
              sep="\n  "
              )
        sys.exit(1)


def create_product(table, user_id, product, profile=None):
    dynamodb = common.dynamodb_session(profile)

    product_id = str(uuid.uuid4())

    if 'notfound' in table:
        if len(product) > 3:
            print('ERROR: The json object in the product fixture doesn\'t look like a notfound product.',
                  'table = ' + table,
                  sep="\n  "
                  )
            sys.exit(1)

        item = {
            "productId": {'S': product_id},
            "brand": {'S': product['brand']},
            "details": {'S': product['details']},
            "productUrl": {'S': product['productUrl']},
            "createdBy": {'S': user_id}
        }
    else:
        if len(product) < 6:
            print('ERROR: The json object in the product fixture doesn\'t look like a products product.',
                  'table = ' + table,
                  sep="\n  "
                  )
            sys.exit(1)

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

    try:
        dynamodb.put_item(TableName=table, Item=item)
    except Exception as e:
        print('ERROR: Unexpected error when creating product in table.',
              'error = ' + str(e),
              'table = ' + table,
              'productId = ' + product_id,
              sep="\n  "
              )
        sys.exit(1)

    return product_id


def add_to_list(table, list_id, product_id, type, quantity=None, profile=None):
    dynamodb = common.dynamodb_session(profile)

    q = '1'
    if quantity:
        q = quantity

    item = {
        "PK": {'S': 'LIST#' + list_id},
        "SK": {'S': 'PRODUCT#' + product_id},
        "type": {'S': type},
        "purchased": {'N': '0'},
        "quantity": {'N': q},
        "reserved": {'N': '0'}
    }

    try:
        dynamodb.put_item(TableName=table, Item=item)
    except Exception as e:
        print('ERROR: Unexpected error when adding product in table.',
              'error = ' + str(e),
              'table = ' + table,
              'productId = ' + product_id,
              sep="\n  "
              )
        sys.exit(1)

    return True


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Creates a product in either the products or notfound table and then adds it to a list.')
    parser.add_argument('-L', '--lists_table', help='lists table name', required=True)
    parser.add_argument('-G', '--gifts_table', help='notfound and products table name', required=True)
    parser.add_argument('-u', '--user', help='user ID', required=True)
    parser.add_argument('-l', '--list', help='list ID', required=True)
    parser.add_argument('-f', '--fixture', help='Path to fixture containing json object for product', required=True)
    parser.add_argument('-q', '--quantity', help='Quantity of gifts to add', required=False)
    parser.add_argument('-P', '--profile', help='local user profile', required=False)
    args = parser.parse_args()
    main(args.lists_table, args.gifts_table, args.list, args.user, args.fixture, args.quantity, args.profile)
