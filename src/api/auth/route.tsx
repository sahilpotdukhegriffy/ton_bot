import { validateTelegramWebAppData } from "../../utils/TelegramAuth";
import Cookies from "js-cookie";
import { encrypt, SESSION_DURATION } from "../../utils/session";

export async function POST(request: Request) {
  const { initData } = await request.json();

  const validationResult = validateTelegramWebAppData(initData);

  if (validationResult.validatedData) {
    console.log("Validation result: ", validationResult);
    const user = { telegramId: validationResult.user.id };

    // Create a new session
    const expires = new Date(Date.now() + SESSION_DURATION);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    Cookies.set("session", session, { expires, httpOnly: true });

    return Response.json({ message: "Authentication successful" });
  } else {
    return Response.json(
      { message: validationResult.message },
      { status: 401 }
    );
  }
}
