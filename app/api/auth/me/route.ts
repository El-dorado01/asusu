import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const userCookie = cookieStore.get("auth_user");

  if (!token || !userCookie) {
    return NextResponse.json(null, { status: 401 });
  }

  try {
    // Optionally validate token with backend if you want extra security
    // const res = await fetch(`${process.env.BACKEND_BASE_URL}/user`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    // if (!res.ok) throw new Error();

    const user = JSON.parse(userCookie.value);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json(null, { status: 401 });
  }
}
