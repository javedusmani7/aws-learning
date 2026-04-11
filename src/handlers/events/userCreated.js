exports.handler = async (event) => {
  try {
    for (const record of event.Records) {
      const body = JSON.parse(record.body);

      console.log("User Created Event:", body);
      
      // ❌ Simulate failure
      if(!body.email || body.email === "javed@gmail.com") {
        throw new Error("Email missing!");
      }

      // Example use cases:
      // ✅ Send email
      // ✅ Send welcome notification
      // ✅ Analytics tracking
    }

    console.log("Success:", body.userId);
    // return { statusCode: 200 };
  } catch (err) {
    console.error("Worker Error:", err);
    
    // 🔥 THIS IS CRITICAL
    throw err;
  }
};