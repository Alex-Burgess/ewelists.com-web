import argparse
import sys
import common


def main(product_id, table, profile=None):
    delete_from_table(product_id, table, profile)

    print("Deleted product: " + product_id)
    return True


def delete_from_table(product_id, table, profile=None):
    dynamodb = common.dynamodb_session(profile)

    try:
        dynamodb.delete_item(
            TableName=table,
            Key={'productId': {'S': product_id}}
        )
    except Exception as e:
        print('ERROR: Unexpected error when deleting product from table.',
              'error = ' + str(e),
              'table = ' + table,
              'productId = ' + product_id,
              sep="\n  "
              )
        sys.exit(1)

    return True


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Delete product from products table.')
    parser.add_argument('-p', '--product_id', help='product id', required=True)
    parser.add_argument('-t', '--table', help='table name', required=True)
    parser.add_argument('-P', '--profile', help='local user profile', required=False)
    args = parser.parse_args()
    main(args.product_id, args.table, args.profile)
