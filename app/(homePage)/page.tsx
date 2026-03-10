import Categories from "@/components/home/Categories";
import Companies from "@/components/home/Companies";
import CTABanner from "@/components/home/CTABanner";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
    <Hero/>
    <Categories/>
    <FeaturedJobs/>
    <HowItWorks/>
    <Companies/>
    <Testimonials/>
    <CTABanner/>
    </>
  );
}
