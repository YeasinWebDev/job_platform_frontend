"use client";

import Link from "next/link";
import CommonHeader from "../CommonHeader";
import { motion } from "framer-motion";
import { Job } from "@/types/jobTypes";
import { useRouter } from "next/navigation";

interface FeaturedJobsProps {
  jobs: {
    jobs: Job[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  loading?: boolean;
}

function FeaturedJobs({ jobs, loading = false }: FeaturedJobsProps) {
  const jobList = jobs?.jobs || [];
  const router = useRouter();

  if (loading) {
    return (
      <section id="jobs" className="py-28 px-8 lg:px-16 bg-[#111110] relative">
        <div className="text-center mb-12">
          <div className="inline-block">
            <div className="text-[0.8rem] text-primary tracking-wider uppercase mb-2">Curated Listings</div>
            <h2 className="font-syne font-bold text-4xl text-cream">Featured <span className="text-primary">Positions</span></h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/15">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-[#111110] p-9">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-primary/10 border border-primary/15 animate-pulse"></div>
                <div className="h-4 bg-primary/10 rounded animate-pulse w-32"></div>
              </div>
              <div className="h-6 bg-primary/10 rounded animate-pulse mb-3.5 w-3/4"></div>
              <div className="flex gap-2 mb-5">
                <div className="h-6 bg-primary/10 rounded animate-pulse w-16"></div>
                <div className="h-6 bg-primary/10 rounded animate-pulse w-16"></div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-t-mist-900">
                <div className="h-8 bg-primary/10 rounded animate-pulse w-40"></div>
                <div className="h-4 bg-primary/10 rounded animate-pulse w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section id="jobs" className="py-28 px-8 lg:px-16 bg-[#111110] relative">
      {/* Header */}
      <CommonHeader subText="Curated Listings" title="Featured" subTitle="Positions" link="/job" linkText="All Open Roles" />

      {/* Jobs Grid */}
      {jobList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/15">
          {jobList.slice(0, 4).map((job, i) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15, ease: "easeInOut" }}
              viewport={{ once: true, margin: "-80px" }}
              key={i}
              className={`cursor-pointer bg-[#111110] hover:bg-[#161614] p-9 relative transition-all duration-300`}
              onClick={() => router.push(`/job/${job.id}`)}
            >
              {/* Company */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-primary/10 border border-primary/15 flex items-center justify-center font-bold text-[0.72rem] text-primary">
                  {job.recruiter?.companyName?.substring(0, 2).toUpperCase() || "CO"}
                </div>
                <span className="text-[0.78rem] text-muted tracking-wider">{job.recruiter?.companyName || "Company"}</span>
              </div>

              {/* Title */}
              <h3 className="font-syne font-bold text-[1.15rem] text-cream leading-[1.2] tracking-[-0.01em] mb-3.5 pr-10">
                {job.title}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-[0.65rem] px-3 py-1 border tracking-wider uppercase">
                  {job.contract}
                </span>
                <span className="text-[0.65rem] px-3 py-1 border tracking-wider uppercase">
                  {job.jobType}
                </span>
                {job.experienceLevel && (
                  <span className="text-[0.65rem] px-3 py-1 border tracking-wider uppercase">
                    {job.experienceLevel}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-t-mist-900">
                <div className="font-syne font-extrabold text-[1.08rem] text-cream">
                  ৳{parseInt(job.minSalary).toLocaleString()} - ৳{parseInt(job.maxSalary).toLocaleString()}
                </div>
                <div className="text-[0.75rem] text-muted">📍 {job.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted">
          No jobs available at the moment.
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/job"
          className="inline-flex items-center gap-2.5 border border-primary text-primary px-8 py-3.5 font-bold text-[0.8rem] tracking-wider uppercase hover:bg-primary hover:text-white transition-all duration-300"
        >
          Browse All 24,000+ Jobs →
        </Link>
      </div>
    </section>
  )
}

export default FeaturedJobs