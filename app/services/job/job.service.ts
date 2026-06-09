"use server";

import { serverFetch } from "@/lib/server-fetch";
import { FilterState } from "@/types/jobTypes";
import { revalidateTag } from 'next/cache';

export const getAllJobs = async ({ page ,search, location, category, experience, jobType, contact, salaryMin, salaryMax, datePosted }: FilterState) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job?page=${page}&limit=6&search=${search}&location=${location}&category=${category}&experience=${experience}&jobType=${jobType}&contact=${contact}&salaryMin=${salaryMin}&salaryMax=${salaryMax}&datePosted=${datePosted}`,
      {
        cache: "no-store",
        next:{
          tags:["job"]
        }
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
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createJob = async (payload: any) => {
  try {
    const result = await serverFetch.post('/job/create-job',{
      body: JSON.stringify(payload),
      headers:{
        "Content-Type": "application/json"
      },
    });
    revalidateTag("job","delete")
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};