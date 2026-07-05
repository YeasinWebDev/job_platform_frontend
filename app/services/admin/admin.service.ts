"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export const allUsers = async (limit: number = 10, page: number = 1) => {
  try {
    const res = await serverFetch.get(`/user/all-users?limit=${limit}&page=${page}`, {
      next: { revalidate: 30, tags: ["allUsers"] },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error in allUsers");
    return { error };
  }
};

export const changeUserRole = async (email: string, role: string) => {
  try {
    const res = await serverFetch.put("/user/change-role", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, role }),
    });

    const data = await res.json();

    revalidateTag("allUsers", "default");
    return data;
  } catch (error) {
    console.log(error, "error in changeUserRole");
    return { error };
  }
};

export const changeUserStatus = async (email: string, status: string) => {
  try {
    const res = await serverFetch.put("/user/change-status", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, status }),
    });

    const data = await res.json();

    revalidateTag("allUsers", "default");
    return data;
  } catch (error) {
    console.log(error, "error in changeUserStatus");
    return { error };
  }
};

export const allApplications = async (limit: number = 10, page: number = 1) => {
  try {
    const res = await serverFetch.get(`/job/all-applications?limit=${limit}&page=${page}`, {
      next: { revalidate: 0 },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error in allApplications");
    return { error };
  }
};

export const getTopRecruiters = async (limit: number = 5) => {
  try {
    const res = await serverFetch.get(`/job/top-recruiters?limit=${limit}`, {
      next: { revalidate: 30, tags: ["topRecruiters"] },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error in getTopRecruiters");
    return { error };
  }
};

export const getJobStatusBreakdown = async () => {
  try {
    const res = await serverFetch.get("/job/status-breakdown", {
      next: { revalidate: 30, tags: ["jobStatusBreakdown"] },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error in getJobStatusBreakdown");
    return { error };
  }
};

export const allJobs = async (limit: number = 10, page: number = 1) => {
  try {
    const res = await serverFetch.get(`/job/all?limit=${limit}&page=${page}`, {
      next: { revalidate: 0 },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error in allJobs");
    return { error };
  }
};

export const updateJobStatus = async (id: string, status: string) => {
  try {
    const res = await serverFetch.put(`/job/update-job-status/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    revalidateTag("allJobs", "default");
    return data;
  } catch (error) {
    console.log(error, "error in updateJobStatus");
    return { error };
  }
};

export const deleteJob = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/job/${id}`);

    const data = await res.json();

    revalidateTag("allJobs", "default");
    return data;
  } catch (error) {
    console.log(error, "error in deleteJob");
    return { error };
  }
};

export const getTotalRevenue = async () => {
  try {
    const res = await serverFetch.get("/payment/total-revenue", {
      next: { revalidate: 30, tags: ["totalRevenue"] },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error in getTotalRevenue");
    return { error };
  }
};
