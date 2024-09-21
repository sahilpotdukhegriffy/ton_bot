import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TelegramAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/session");
      if (response.ok) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    }
  };

  const authenticateUser = async () => {
    const WebApp = (await import("@twa-dev/sdk")).default;
    WebApp.ready();
    const initData = WebApp.initData;
    if (initData) {
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ initData }),
        });

        if (response.ok) {
          setIsAuthenticated(true);
          navigate("/protected"); // This navigate will now work because it's inside a <Router>
        } else {
          console.error("Authentication failed");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        setIsAuthenticated(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      {isAuthenticated ? (
        <>
          <p>Authenticated!</p>
          <button
            onClick={() => navigate("/protected")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Access Protected Page
          </button>
        </>
      ) : (
        <div>
          <p>You need to authenticate to access this account</p>
          <button
            onClick={authenticateUser}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Authenticate
          </button>
        </div>
      )}
    </div>
  );
}
