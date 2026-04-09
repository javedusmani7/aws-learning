exports.handler = async (event) => {
  try {
    for (const record of event.Records) {
      const body = JSON.parse(record.body);

      console.log("User Created Event:", body);
      // Example use cases:
      // ✅ Send email
      // ✅ Send welcome notification
      // ✅ Analytics tracking
    }

    return { statusCode: 200 };
  } catch (err) {
    console.error("Worker Error:", err);
  }
};