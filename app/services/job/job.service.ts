"use server";

import { FilterState } from "@/types/jobTypes";

export const getAllJobs = async ({ search, location, category, experience, jobTypes, contact, salaryMin, salaryMax, datePosted }: FilterState) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job?search=${search}&location=${location}&category=${category}&experience=${experience}&jobTypes=${jobTypes}&contact=${contact}&salaryMin=${salaryMin}&salaryMax=${salaryMax}&datePosted=${datePosted}`,
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
