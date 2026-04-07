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

exports.updateUser = async (userId, data) => {
  await dynamo.update({
    TableName: TABLE,
    Key: { userId },
    UpdateExpression: "set #name = :name",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": data.name,
    },
  }).promise();

  return { userId, ...data };
};

exports.deleteUser = async (userId) => {
  await dynamo.delete({
    TableName: TABLE,
    Key: { userId },
  }).promise();

  return { message: "User deleted" };
};