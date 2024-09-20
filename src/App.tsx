import { useEffect, useState } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";

interface UserData {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  language_code?: string;
  is_premium?: boolean;
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);

  return (
    <>
      {userData ? (
        <>
          <h1>UserData</h1>
          <ul>
            <li>ID: {userData.id}</li>
            <li>First Name: {userData.first_name}</li>
            <li>LastName: {userData.last_name}</li>
            <li>Username: {userData.username}</li>
            <li>Language Code: {userData.language_code}</li>
            <li>Is Premium: {userData.is_premium ? "Yes" : "No"}</li>
            <li>Hello</li>
          </ul>
        </>
      ) : (
        <div>Loading... Please Wait</div>
      )}
    </>
  );
}

export default App;
