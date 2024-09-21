import { useState } from "react";
import Cookies from "js-cookie";

const TelegramAuth = () => {
  const [authMessage, setAuthMessage] = useState("");

  const authenticateUser = async () => {
    const WebApp = (await import("@twa-dev/sdk")).default;
    WebApp.ready();

    const initData = WebApp.initData;

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initData }), // Send initData to your server API
      });

      if (response.ok) {
        const data = await response.json();
        setAuthMessage(data.message);

        // Optionally set a client-side cookie or handle authentication in a different way
        Cookies.set("session", data.session, { expires: 1 });

        // Optionally redirect after successful authentication
      } else {
        const errorData = await response.json();
        setAuthMessage(errorData.message);
      }
    } catch (error) {
      console.error("Authentication ed:", error);
      setAuthMessage("Authentication failed. Please try again.");
    }
  };

  return (
    <div>
      <p>{authMessage}</p>
      <button onClick={authenticateUser}>Authenticate via Telegram</button>
    </div>
  );
};

export default TelegramAuth;
