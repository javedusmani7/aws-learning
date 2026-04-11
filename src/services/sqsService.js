const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const client = new SQSClient({
  region: process.env.AWS_REGION,
});

const USER_SIGNUP_QUEUE_URL = process.env.SQS_USER_SIGNUP_QUEUE_URL;

exports.sendUserCreatedEvent = async (message) => {
  await client.send(
    new SendMessageCommand({
      QueueUrl: USER_SIGNUP_QUEUE_URL,
      MessageBody: JSON.stringify(message),
    })
  );
};