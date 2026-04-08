exports.success = (data, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(data),
});

exports.error = (message, statusCode = 500) => ({
  statusCode,
  body: JSON.stringify({ message }),
});