// api/auth.js

const { validateTelegramWebAppData } = require("../src/utils/telegramAuth"); // Adjust the path if necessary
const { encrypt, SESSION_DURATION } = require("../src/utils/session"); // Adjust the path if necessary

module.exports = async (req, res) => {
  if (req.method === "POST") {
    // Parse the incoming data
    const { initData } = req.body;

    // Validate the Telegram WebApp Data
    const validationResult = validateTelegramWebAppData(initData);

    if (validationResult.validatedData) {
      // Extract user data
      const user = { telegramId: validationResult.user.id };

      // Create a new session
      const expires = new Date(Date.now() + SESSION_DURATION);
      const session = await encrypt({ user, expires });

      // Set the session in the response (you can set it as a cookie or return it)
      res.setHeader(
        "Set-Cookie",
        `session=${session}; Path=/; HttpOnly; Expires=${expires.toUTCString()}`
      );

      // Send a success response back to the client
      return res
        .status(200)
        .json({ message: "Authentication successful", session });
    } else {
      // If validation fails, return an error
      return res.status(401).json({ message: validationResult.message });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }
};
