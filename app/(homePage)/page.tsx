import Categories from "@/components/home/Categories";
import Companies from "@/components/home/Companies";
import CTABanner from "@/components/home/CTABanner";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import { getAllCategories } from "@/app/services/category/category.service";
import { getAllJobs } from "@/app/services/job/job.service";

export default async function Home() {
  const categories = await getAllCategories();
  const jobsData = await getAllJobs({
    page: 1,
    search: "",
    location: "",
    category: "",
    experience: [],
    jobType: "",
    contact: [],
    salaryMin: 0,
    salaryMax: 160000,
    datePosted: ""
  });


  return (
    <>
    <Hero/>
    <Categories categories={categories?.data ?? []} />
    <FeaturedJobs jobs={jobsData?.data} loading={!jobsData} />
    <HowItWorks/>
    <Companies/>
    <Testimonials/>
    <CTABanner/>
    </>
  );
}
