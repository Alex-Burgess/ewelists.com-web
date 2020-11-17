#!/bin/bash


PIPELINE=$1

if [[ -n "$PIPELINE" ]]; then
    echo "Checking $PIPELINE ..."
else
    echo "No pipeline was provided as a parameter."
    exit 1
fi

TRIGGER=$(aws codepipeline list-pipeline-executions --pipeline-name $PIPELINE --query "pipelineExecutionSummaries[0].trigger.triggerType" --output text | head -1)
PREVIOUS_STATE=$(aws codepipeline list-pipeline-executions --pipeline-name $PIPELINE --query "pipelineExecutionSummaries[1].status" --output text | head -1)
PREVIOUS_COMMIT_ID=$(aws codepipeline list-pipeline-executions --pipeline-name $PIPELINE --query "pipelineExecutionSummaries[1].sourceRevisions[?actionName=='Web'].revisionId" --output text | head -1)

if [ $TRIGGER = "StartPipelineExecution" ]; then
  echo "TRIGGER:$TRIGGER"
  echo "Updating content due to pipeline trigger being StartPipelineExecution [manual]."
  exit 0
elif [ $PREVIOUS_STATE != "Succeeded" ]  && [ $PREVIOUS_STATE != "InProgress" ]; then
  echo "PREVIOUS_STATE:$PREVIOUS_STATE"
  echo "Updating content due to previous pipeline state being Succeeded or InProgress."
  exit 0
elif [ $Commit_ID != $PREVIOUS_COMMIT_ID ]; then
  echo "Latest commit:$Commit_ID"
  echo "Previous commit:$PREVIOUS_COMMIT_ID"
  echo "Updating content due to commit to Web repository."
  exit 0
else
  echo "No need to update web contet."
  exit 1
fi

exit 0
