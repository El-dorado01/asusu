// app/actions/getUser.ts
"use server";
import { apiFetch } from "@/lib/api";

export async function getCurrentUser() {
  const res = await apiFetch("/user", {}, true); // server: true
  if (!res.ok) return null;
  return res.json();
}
