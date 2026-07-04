"use server";

import { serverFetch } from "@/lib/server-fetch";
import { ApplicationStatus, FilterState } from "@/types/jobTypes";
import { revalidateTag } from "next/cache";

export const getAllJobs = async ({ page, search, location, category, experience, jobType, contact, salaryMin, salaryMax, datePosted }: FilterState) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job?page=${page}&limit=6&search=${search}&location=${location}&category=${category}&experience=${experience}&jobType=${jobType}&contact=${contact}&salaryMin=${salaryMin}&salaryMax=${salaryMax}&datePosted=${datePosted}`,
      {
        cache: "no-store",
        next: {
          tags: ["job"],
        },
      },
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (id: string) => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/${id}`, {
      cache: "no-store",
      next: {
        tags: ["job"],
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createJob = async (payload: any) => {
  try {
    const result = await serverFetch.post("/job/create-job", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("job", "delete");
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const applyForJob = async (jobId: string) => {
  try {
    const result = await serverFetch.post(`/job/apply-for-job`, {
      body: JSON.stringify({ jobId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    revalidateTag("job", "getMe");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const myApplicationsList = async (page: number, search: string, status: ApplicationStatus | null) => {
  try {
    const result = await serverFetch.get(`/user/applications?page=${page}&limit=3&search=${search}&status=${status}`, {
      cache: "no-store",
      next: {
        tags: ["job"],
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const MyCreatedJobs = async (page: number, search: string) => {
  try {
    const result = await serverFetch.get(`/job/my-created-jobs?page=${page}&limit=3&search=${search}`, {
      cache: "no-store",
      next: {
        tags: ["job"],
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateJobStatus = async (id: string, status: string) => {
  try {
    const result = await serverFetch.put(`/job/update-job-status/${id}`, {
      body: JSON.stringify({ status }),
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

export const deleteJob = async (id: string) => {
  try {
    const result = await serverFetch.delete(`/job/${id}`);
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyBookmarkedJobs = async () => {
  try {
    const result = await serverFetch.get(`/job/myBookmarkJobs`, {
      cache: "no-store",
      next: {
        tags: ["job"],
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createBookmark = async (jobId: string) => {
  try {
    const result = await serverFetch.post(`/job/bookMarkJob/${jobId}`);
    const data = await result.json();
    revalidateTag("job", "getMe");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookmark = async (jobId: string) => {
  try {
    const result = await serverFetch.delete(`/job/removeMyBookmarkJob/${jobId}`);
    const data = await result.json();
    revalidateTag("job", "getMe");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateApplicationStatus = async (applicationId: string, status: string) => {
  try {
    const result = await serverFetch.put(`/job/update-application-status/${applicationId}`, {
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    revalidateTag("job", "delete");
    revalidateTag("recruiterOverview", "default");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecruiterApplications = async (page: number, search: string, contractType?: string) => {
  try {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", "10");
    if (search) params.set("search", search);
    if (contractType) params.set("contractType", contractType);

    const result = await serverFetch.get(`/job/recruiter-applications?${params.toString()}`, {
      cache: "no-store",
      next: {
        tags: ["job"],
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
