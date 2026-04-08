const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE = "UsersTable";
// const TABLE = process.env.USERS_TABLE; // ✅ FIXED


exports.createUser = async (user) => {
await dynamo.send(
    new PutCommand({
      TableName: TABLE,
      Item: user,
    })
  );

  return user;
};

exports.getUser = async (userId) => {
  const result = await dynamo.send(
    new GetCommand({
      TableName: TABLE,
      Key: { userId },
    })
  );

  return result.Item;
};

exports.updateUser = async (userId, data) => {
  const result = await dynamo.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { userId },
      UpdateExpression: "set #name = :name",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": data.name,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes;
};

exports.deleteUser = async (userId) => {
  await dynamo.send(
    new DeleteCommand({
      TableName: TABLE,
      Key: { userId },
    })
  );

  return { message: "User deleted" };
};

// exports.updateUser = async (userId, data) => {
//   await dynamo.update({
//     TableName: TABLE,
//     Key: { userId },
//     UpdateExpression: "set #name = :name",
//     ExpressionAttributeNames: {
//       "#name": "name",
//     },
//     ExpressionAttributeValues: {
//       ":name": data.name,
//     },
//     ReturnValues: "ALL_NEW",
//   }).promise();

//   return result.Attributes; 
//   // return { userId, ...data };
// };

// exports.deleteUser = async (userId) => {
//   await dynamo.delete({
//     TableName: TABLE,
//     Key: { userId },
//   }).promise();

//   return { message: "User deleted" };
// };