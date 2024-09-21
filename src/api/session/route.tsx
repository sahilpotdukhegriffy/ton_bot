import { useEffect, useState } from "react";

const CheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to check if the user is authenticated
  const checkAuth = async () => {
    try {
      const response = await fetch("/api/session"); // This should point to your backend API
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated); // Set the authentication status
      } else {
        setIsAuthenticated(false); // If the response has a 401 status, set to false
      }
    } catch (err) {
      console.error("Error checking authentication:", err);
      setError("Failed to check authentication.");
      setIsAuthenticated(false);
    }
  };

  // Call the authentication check when the component mounts
  useEffect(() => {
    checkAuth();
  }, []);

  // Show loading state until authentication status is determined
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Render the result of the authentication check
  return (
    <div>
      {isAuthenticated ? (
        <div>User is authenticated</div>
      ) : (
        <div>User is not authenticated</div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default CheckAuth;
