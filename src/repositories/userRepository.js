const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE = "UsersTable";

exports.createUser = async (user) => {
  await dynamo.put({
    TableName: TABLE,
    Item: user,
  }).promise();

  return user;
};

exports.getUser = async (userId) => {
  const result = await dynamo.get({
    TableName: TABLE,
    Key: { userId },
  }).promise();

  return result.Item;
};