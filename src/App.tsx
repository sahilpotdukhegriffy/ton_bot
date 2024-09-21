import { useEffect, useState } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";
// import TelegramAuth from "./components/TelegramAuth";
import { getSession } from "./utils/session";

interface UserData {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  language_code?: string;
  is_premium?: boolean;
}

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  // const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Telegram SDK and session from your server
  // useEffect(() => {
  //   const fetchSession = async () => {
  //     try {
  //       // Fetch session from your API or server
  //       const sessionData = await getSession();
  //       setSession(sessionData);
  //     } catch (error) {
  //       console.error("Error fetching session:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (WebApp.initDataUnsafe.user) {
  //     setUserData(WebApp.initDataUnsafe.user as UserData);
  //   }

  //   // Fetch the session data
  //   fetchSession();
  // }, []);

  // While loading, show a loading indicator
  if (loading) {
    return <div>Loading... Please Wait</div>;
  }

  return (
    <>
      {userData ? (
        <>
          <h1>UserData</h1>
          <ul>
            <li>ID: {userData.id}</li>
            <li>First Name: {userData.first_name}</li>
            <li>Last Name: {userData.last_name}</li>
            <li>Username: {userData.username}</li>
            <li>Language Code: {userData.language_code}</li>
            <li>Is Premium: {userData.is_premium ? "Yes" : "No"}</li>
            <li>Hello</li>
          </ul>
        </>
      ) : (
        <div>No user data available</div>
      )}

      {/* <h1 className="text-4xl font-bold mb-8">
        Jwt Authentication for Telegram Mini Apps
      </h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <TelegramAuth /> */}
    </>
  );
};

export default App;
