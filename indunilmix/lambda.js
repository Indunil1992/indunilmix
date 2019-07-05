let AWS = require('aws-sdk');
let SL_AWS = require('slappforge-sdk-aws');
const sqs = new SL_AWS.SQS(AWS);

exports.handler = function (event, context, callback) {






    sqs.sendMessage({
        MessageBody: 'SQS check',
        QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/IndunilSQS.fifo`,
        DelaySeconds: '0',
        MessageDeduplicationId: '123',
        MessageAttributes: {}
    }, function (data) {
        // your logic (logging etc) to handle successful message delivery, should be here
    }, function (error) {
        // your logic (logging etc) to handle failures, should be here
    });






    callback(null, { "message": "Successfully executed" });
}