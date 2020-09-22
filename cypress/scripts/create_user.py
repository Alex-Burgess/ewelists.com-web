import argparse
import sys
import common


def main(email, name, user_pool_id, profile=None):
    username = create_in_cognito(email, name, user_pool_id, profile)
    set_password(email, user_pool_id, profile)

    print(username)
    return True


def create_in_cognito(email, name, user_pool_id, profile=None):
    cognito = common.cognito_session(profile)

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


def set_password(email, user_pool_id, profile=None):
    password = 'P4ssw0rd!'
    cognito = common.cognito_session(profile)

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
    parser.add_argument('-U', '--user_pool', help='userpool id', required=True)
    parser.add_argument('-P', '--profile', help='local user profile', required=False)
    args = parser.parse_args()
    main(args.email, args.name, args.user_pool, args.profile)
