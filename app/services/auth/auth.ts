"use server";

import { revalidateTag } from "next/cache";
import { getCookie, removeCookie, setCookie } from "./tokenHandler";
import { serverFetch } from "@/lib/server-fetch";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (result.success) {
      await setCookie("authToken", result.data.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
      });

      revalidateTag("getMe", "default");

      return result;
    } else {
      return { error: result.message };
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const registerUser = async (name: string, email: string, password: string, role: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (result.success) {
      await setCookie("authToken", result.data.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
      });

      return result;
    } else {
      return { error: result.message };
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const logoutUser = async () => {
  await removeCookie("authToken");
  revalidateTag("getMe", "default");
};

export const getMe = async () => {
  // const getToken = await getCookie("authToken");
  try {
    const response = await serverFetch.get("/user/me", {
      next: {
        tags: ["getMe"],
      },
    });
    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      return { error: result.message };
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const sendVerificationRequest = async () => {
  try {
    const response = await serverFetch.post("/auth/send-verification-email", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      return { error: result.message };
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyUser = async (verifyCode: string) => {
  try {
    const response = await serverFetch.post("/auth/verify-email", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code:verifyCode }),
      cache: "no-store",
    });
    const result = await response.json();

    if (result.success) {
      revalidateTag("getMe", "default");
      return result.data;
    } else {
      return { error: result.message };
    }
  } catch (error) {
    console.log(error);
  }
};
