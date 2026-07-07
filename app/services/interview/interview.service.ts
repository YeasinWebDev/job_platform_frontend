"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export const generateInterviewPrep = async (jobId: string) => {
  try {
    const result = await serverFetch.post(`/interview/generate/${jobId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInterviewPrep = async (jobId: string) => {
  try {
    const result = await serverFetch.get(`/interview/${jobId}`, {
      cache: "no-store",
      next: {
        tags: ["interview"],
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllInterviewPreps = async () => {
  try {
    const result = await serverFetch.get(`/interview`, {
      cache: "no-store",
      next: {
        tags: ["interview"],
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInterviewPrep = async (jobId: string) => {
  try {
    const result = await serverFetch.delete(`/interview/${jobId}`);
    const data = await result.json();
    revalidateTag("interview", "default");
    return data;
  } catch (error) {
    console.log(error);
  }
};