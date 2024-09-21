import { getSession } from "../../utils/session";

export async function GET() {
  const session = await getSession();
  if (session) {
    return Response.json({ isAuthenticated: true });
  } else {
    return Response.json({ isAuthenticated: false }, { status: 401 });
  }
}
