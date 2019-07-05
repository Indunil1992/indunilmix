let AWS = require('aws-sdk');
let SL_AWS = require('slappforge-sdk-aws');
const sqs = new SL_AWS.SQS(AWS);

exports.handler = function (event, context, callback) {


    sqs.sendMessage({
        MessageBody: 'SQS check',
        QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/hiruindu`,
        DelaySeconds: '0',
        MessageDeduplicationId: '123',
        MessageGroupId: '142',
        MessageAttributes: {
            "@a": {
                "DataType": "String",
                "StringValue": "1"
            }
        }
    }, function (data) {
        console.log("success - S3" + { data });
        callback(null, "Successfully executed to enduser data" + { data });
        // your logic (logging etc) to handle successful message delivery, should be here

    }, function (error) {
        // your logic (logging etc) to handle failures, should be here
        console.log("error - S3" + { err });
        callback(null, "Successfully executed to enduser catch" + { err });
    });

    sqs.sendMessage({
        MessageBody: 'hiru test',
        QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/hiruindu`,
        DelaySeconds: '0',
        MessageAttributes: {
            "x": {
                "DataType": "String",
                "StringValue": "1"
            },
            "d": {
                "DataType": "String",
                "StringValue": "1"
            }
        }
    }, function (data) {
        console.log("Success");
        // your logic (logging etc) to handle successful message delivery, should be here
    }, function (error) {
        console.log("error");
        // your logic (logging etc) to handle failures, should be here
    });

    sqs.receiveMessage({
        QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/lp`,
        AttributeNames: ['All'],
        MaxNumberOfMessages: '1',
        VisibilityTimeout: '30',
        WaitTimeSeconds: '0'
    }).promise()
        .then(receivedMsgData => {
            if (!!(receivedMsgData) && !!(receivedMsgData.Messages)) {
                let receivedMessages = receivedMsgData.Messages;
                receivedMessages.forEach(message => {
                    // your logic to access each message through out the loop. Each message is available under variable message 
                    // within this block
                });
            } else {
                // No messages to process
            }
        })
        .catch(err => {
            // error handling goes here
        });




    callback(null, { "message": "Successfully executed" });
}