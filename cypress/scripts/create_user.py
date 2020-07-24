import argparse
import boto3
import sys

session = boto3.session.Session(profile_name='cypress-test')
cognito = session.client('cognito-idp')


def main(email, name, user_pool_id, table_name):
    username = create_in_cognito(email, name, user_pool_id)
    set_password(email, user_pool_id)

    print(username)
    return True


def create_in_cognito(email, name, user_pool_id):
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
        print('ERROR: User could not be created in cognito userpool.',
              'error = ' + str(e),
              'userpool = ' + user_pool_id,
              'email = ' + email,
              sep="\n  "
              )
        sys.exit(1)

    return response['User']['Username']


def set_password(email, user_pool_id):
    password = 'P4ssw0rd!'

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
        print('ERROR: Password could not be set for user in cognito userpool.',
              'error = ' + str(e),
              'userpool = ' + user_pool_id,
              'email = ' + email,
              sep="\n  "
              )
        sys.exit(1)

    return True


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Create test user in cognito and lists table.')
    parser.add_argument('-e', '--email', help='users email', required=True)
    parser.add_argument('-n', '--name', help='users name', required=True)
    # Add userpool and table names as arguments
    args = parser.parse_args()
    main(args.email, args.name, 'eu-west-1_vqox9Z8q7', 'lists-test')
