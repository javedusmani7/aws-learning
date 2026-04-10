exports.handler = async (event) => {
  try {
    for (const record of event.Records) {
      const body = JSON.parse(record.body);

      console.log("User Created Event:", body);
      
      // ❌ Simulate failure
      if(!body.email) {
        throw new Error("Email missing!");
      }

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