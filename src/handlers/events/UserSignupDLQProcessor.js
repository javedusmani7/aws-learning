exports.handler = async (event) => {
  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body);

      console.log("DLQ MESSAGE RECEIVED:", body);

      // 🔍 Identify reason
      if (!body.email) {
        console.log("Permanent failure: Missing email");
        continue;
      }

      // 🔁 OPTIONAL: Retry logic
      console.log("Retrying message...");

      // Example: you could resend to main queue here

    } catch (err) {
      console.error("DLQ Processor Error:", err);

      // ❗ DO NOT throw here unless you want infinite loop
    }
  }

  return { statusCode: 200 };
};