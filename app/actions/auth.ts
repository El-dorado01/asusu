"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  credential: z.string(),
  password: z.string(),
});

export async function loginAction(formData: unknown) {
  const validated = loginSchema.safeParse(formData);
  if (!validated.success) {
    return { error: "Invalid form data" };
  }

  const { credential, password } = validated.data;

  try {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ credential, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message =
        errorData.message ||
        errorData.errors?.credential?.[0] ||
        "Invalid credentials";
      return { error: message };
    }

    const data = await res.json();

    // Fix: Await cookies() because it's now async in Server Actions
    const cookieStore = await cookies();

    cookieStore.set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    cookieStore.set("auth_user", JSON.stringify(data.user), {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
}

export async function logoutAction() {
    // const res = await fetch(`${process.env.BACKEND_BASE_URL}/auth/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({ credential, password }),
    // });

    // if (!res.ok) {
    //   const errorData = await res.json().catch(() => ({}));
    //   const message =
    //     errorData.message ||
    //     errorData.errors?.credential?.[0] ||
    //     "Invalid credentials";
    //   return { error: message };
    // }

  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("auth_user");

  redirect("/login");
}
