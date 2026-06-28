"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export const updateProfile = async (body: any) => {
  try {
    const res = await serverFetch.put("/user/profile", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    revalidateTag("getMe","default");
    return data;
  } catch (error) {
    console.log(error, "error in update profile");
  }
};

export const getUserOverView = async () => {
  try {
    const res = await serverFetch.get("/user/user-overview", {
      next: { revalidate: 30, tags: ["userOverview"] },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error in get user overview");
  }
};