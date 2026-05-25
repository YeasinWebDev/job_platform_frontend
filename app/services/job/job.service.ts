"use server";

import { FilterState } from "@/types/jobTypes";

export const getAllJobs = async ({ page ,search, location, category, experience, jobType, contact, salaryMin, salaryMax, datePosted }: FilterState) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job?page=${page}&search=${search}&location=${location}&category=${category}&experience=${experience}&jobType=${jobType}&contact=${contact}&salaryMin=${salaryMin}&salaryMax=${salaryMax}&datePosted=${datePosted}`,
      {
        cache: "no-store",
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