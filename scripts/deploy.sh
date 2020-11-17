#!/bin/bash

DOMAIN=$1

if [[ -n "$DOMAIN" ]]; then
    echo "Deploying to $DOMAIN ..."
else
    echo "No domain was provided as a parameter."
    exit 1
fi


echo "Uploading content to s3://$DOMAIN"
aws s3 sync build/ s3://$DOMAIN --delete --exclude 'build/status.html'
if [ $? != 0 ]; then
  echo "There was an error syncing content."
  exit 1
fi

aws s3 cp build/status.html s3://${DOMAIN}/status.html --cache-control no-cache
if [ $? != 0 ]; then
  echo "There was an error syncing content."
  exit 1
fi

DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[].{ID:Id, AliaseDomainName:Aliases.Items[0]}[?AliaseDomainName=='$DOMAIN']" --output text | awk '{print $2}')
if [ $? != 0 ]; then
  echo "There was an error invalidating cache."
  exit 1
fi

INVALIDATION_ID=$(aws cloudfront create-invalidation --paths '/*' --distribution-id $DISTRIBUTION_ID --query "Invalidation.Id" --output text)
if [ $? != 0 ]; then
  echo "There was an error invalidating cache."
  exit 1
fi

echo "Invalidating cache [$INVALIDATION_ID]..."
aws cloudfront wait invalidation-completed --distribution-id $DISTRIBUTION_ID --id $INVALIDATION_ID

echo "Deployment complete."
