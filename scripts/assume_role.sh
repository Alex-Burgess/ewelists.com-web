#!/bin/bash

ACCOUNT_ID=$1
ROLE_NAME=$2

if [[ -n "$ACCOUNT_ID" ]]; then
    echo "Account ID:$ACCOUNT_ID"
else
    echo "No account id was provided as a parameter."
    exit 1
fi

if [[ -n "$ROLE_NAME" ]]; then
    echo "Role Name:$ROLE_NAME"
else
    echo "No role name was provided as a parameter. Will not attempt assume role."
    exit 0
fi

TEMP_ROLE=$(aws sts assume-role --role-arn "arn:aws:iam::$ACCOUNT_ID:role/$ROLE_NAME" --role-session-name "webdeploy")
echo "Assuming role:$TEMP_ROLE"

export AWS_ACCESS_KEY_ID=$(echo "${TEMP_ROLE}" | jq -r '.Credentials.AccessKeyId')
export AWS_SECRET_ACCESS_KEY=$(echo "${TEMP_ROLE}" | jq -r '.Credentials.SecretAccessKey')
export AWS_SESSION_TOKEN=$(echo "${TEMP_ROLE}" | jq -r '.Credentials.SessionToken')
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID --profile webdeploy
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY --profile webdeploy
aws configure set aws_session_token $AWS_SESSION_TOKEN --profile webdeploy
