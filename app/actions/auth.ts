// app/actions/auth.ts
'use server';

import { apiFetch } from '@/lib/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { MOCK_CURRENT_USER } from '@/lib/mock-data';

const loginSchema = z.object({
  credential: z.string(),
  password: z.string(),
});

export async function loginAction(formData: unknown) {
  const validated = loginSchema.safeParse(formData);
  if (!validated.success) {
    return { error: 'Invalid form data' };
  }

  const { credential, password } = validated.data;

  try {
    /* ORIGINAL BACKEND CALL:
    const res = await apiFetch(
      '/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ credential, password }),
      },
      true
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message =
        errorData.message ||
        errorData.errors?.credential?.[0] ||
        'Invalid credentials';
      return { error: message };
    }

    const data = await res.json();
    */

    // MOCK DATA MODE:
    const data = {
      token: 'mock_token_12345',
      user: {
        ...MOCK_CURRENT_USER,
        name: credential.includes('@') ? credential.split('@')[0] : credential,
      },
    };

    const cookieStore = await cookies();

    cookieStore.set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    cookieStore.set('auth_user', JSON.stringify(data.user), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return { success: true };
  } catch (error) {
    return { error: 'Something went wrong. Please try again.' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();

  try {
    /* ORIGINAL BACKEND CALL:
    const res = await apiFetch(
      '/auth/logout',
      {
        method: 'DELETE',
      },
      true
    );

    if (!res.ok) {
      console.error('Backend logout failed, but proceeding with client logout');
    }
    */
  } catch (error) {
    console.error('Error calling logout endpoint:', error);
  } finally {
    // Always clear cookies client-side
    cookieStore.delete('auth_token');
    cookieStore.delete('auth_user');
  }

  redirect('/login');
}

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string(),
  password_confirmation: z.string(),
});

export async function registerAction(formData: unknown) {
  const validated = registerSchema.safeParse(formData);
  if (!validated.success) {
    return { error: 'Invalid form data' };
  }

  const { name, email, phone, password, password_confirmation } =
    validated.data;

  try {
    /* ORIGINAL BACKEND CALL:
    const res = await apiFetch(
      '/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email: email,
          phone: phone || null,
          password,
          password_confirmation,
        }),
      },
      true
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message =
        errorData.message || errorData.errors?.[0] || 'Registration failed';
      return { error: message };
    }

    const data = await res.json();
    */

    // MOCK DATA MODE:
    const data = {
      token: 'mock_token_12345',
      user: {
        id: 1,
        name,
        email,
        phone: phone || null,
        avatar_url: MOCK_CURRENT_USER.avatar_url,
      },
    };

    const cookieStore = await cookies();

    cookieStore.set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    cookieStore.set('auth_user', JSON.stringify(data.user), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return { success: true };
  } catch (error) {
    return { error: 'Something went wrong. Please try again.' };
  }
}

export async function forgotPasswordAction(formData: unknown) {
  const validated = z.object({ email: z.string().email() }).safeParse(formData);
  if (!validated.success) return { error: 'Invalid email' };

  const { email } = validated.data;

  try {
    /* ORIGINAL BACKEND CALL:
    const res = await apiFetch(
      '/auth/password/forgot',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      },
      true
    );

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { error: data.message || 'Failed to send OTP' };
    }
    */

    return { success: true };
  } catch {
    return { error: 'Network error. Try again.' };
  }
}

// Resend OTP
export async function resendOtpAction(formData: { email: string }) {
  try {
    /* ORIGINAL BACKEND CALL:
    const res = await apiFetch(
      '/auth/password/forgot',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      },
      true
    );

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { error: data.message || 'Failed to resend OTP' };
    }
    */

    return { success: true };
  } catch {
    return { error: 'Network error' };
  }
}

export async function resetPasswordAction(formData: unknown) {
  const validated = z
    .object({
      email: z.string().email(),
      otp: z.string().length(6),
      password: z.string(),
      password_confirmation: z.string(),
    })
    .safeParse(formData);

  if (!validated.success) return { error: "Invalid data" };

  const { email, otp, password, password_confirmation } = validated.data;

  try {
    /* ORIGINAL BACKEND CALL:
    const res = await apiFetch(`/auth/password/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
        password,
        password_confirmation,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const message = data.message || data.errors?.otp?.[0] || "Invalid OTP or expired";
      return { error: message };
    }

    const data = await res.json();
    */

    // MOCK DATA MODE:
    const data = {
      token: 'mock_token_12345',
      user: {
        ...MOCK_CURRENT_USER,
        email,
      },
    };

    const cookieStore = await cookies();

    cookieStore.set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    cookieStore.set("auth_user", JSON.stringify(data.user), {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return { success: true };
  } catch (error: any) {
    if (error?.digest?.includes("NEXT_REDIRECT")) {
      return;
    }

    return { error: "Something went wrong. Please try again." };
  }
}
