import { jwtVerify, SignJWT } from "jose";
import Cookies from "js-cookie";

const key = new TextEncoder().encode(import.meta.env.VITE_JWT_KEY);

export const SESSION_DURATION = 60 * 60 * 1000;

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export const getSession = async (): Promise<string | null> => {
  const sessionCookie = Cookies.get("session");
  console.log("Session value in getSession:", sessionCookie);

  if (!sessionCookie) return null;

  try {
    const decryptedSession = await decrypt(sessionCookie);
    return decryptedSession;
  } catch (error) {
    console.error("Error decrypting session:", error);
    return null;
  }
};

export const updateSession = async () => {
  // Get the session from cookies
  const session = Cookies.get("session");

  if (!session) return;

  try {
    // Decrypt the session
    const parsedSession = await decrypt(session);

    // Update the session expiration time
    parsedSession.expires = new Date(Date.now() + SESSION_DURATION);

    // Re-encrypt and update the session cookie
    const encryptedSession = await encrypt(parsedSession);
    Cookies.set("session", encryptedSession, {
      expires: parsedSession.expires,
      httpOnly: true, // Note: `httpOnly` is ignored on the client-side
    });

    console.log("Session updated successfully");
  } catch (error) {
    console.error("Failed to update session:", error);
  }
};
