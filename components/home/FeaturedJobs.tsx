"use client"

import Link from "next/link";
import CommonHeader from "../CommonHeader";
import { motion } from "framer-motion";



const jobs = [
  {
    initials: "ST",
    company: "Stripe",
    title: "Lead Product Designer — Checkout Experience",
    tags: [
      { label: "Full-time", type: "type" },
      { label: "Remote", type: "default" },
      { label: "🔥 Hot", type: "hot" },
    ],
    salary: "$140–180K",
    location: "📍 Remote, US",
  },
  {
    initials: "OA",
    company: "OpenAI",
    title: "Research Engineer — Reinforcement Learning",
    tags: [
      { label: "Full-time", type: "type" },
      { label: "San Francisco", type: "default" },
      { label: "🔥 Hot", type: "hot" },
    ],
    salary: "$250–350K",
    location: "📍 SF, California",
  },
  {
    initials: "LN",
    company: "Linear",
    title: "Staff Frontend Engineer — Design Systems",
    tags: [
      { label: "Full-time", type: "type" },
      { label: "Hybrid", type: "default" },
      { label: "New", type: "default" },
    ],
    salary: "$190–240K",
    location: "📍 NYC / Remote",
  },
  {
    initials: "FG",
    company: "Figma",
    title: "Senior Growth Product Manager",
    tags: [
      { label: "Full-time", type: "type" },
      { label: "On-site", type: "default" },
    ],
    salary: "$170–210K",
    location: "📍 San Francisco",
  }
];

function FeaturedJobs() {
  return (
    <section id="jobs" className="py-28 px-8 lg:px-16 bg-[#111110] relative">
      {/* Header */}
      <CommonHeader subText="Curated Listings" title="Featured" subTitle="Positions" link="#" linkText="All Open Roles" /> 

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/15">
        {jobs.map((job, i) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15, ease: "easeInOut" }}
            viewport={{ once: true, margin: "-80px" }}
            key={i}
            className={`cursor-pointer bg-[#111110] hover:bg-[#161614] p-9 relative transition-all duration-300`}
          >
            {/* Company */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-primary/10 border border-primary/15 flex items-center justify-center font-bold text-[0.72rem] text-primary">
                {job.initials}
              </div>
              <span className="text-[0.78rem] text-muted tracking-wider">{job.company}</span>
            </div>

            {/* Title */}
            <h3 className="font-syne font-bold text-[1.15rem] text-cream leading-[1.2] tracking-[-0.01em] mb-3.5 pr-10">
              {job.title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {job.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`text-[0.65rem] px-3 py-1 border tracking-wider uppercase`}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-t-mist-900">
              <div className="font-syne font-extrabold text-[1.08rem] text-cream">{job.salary}</div>
              <div className="text-[0.75rem] text-muted">{job.location}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          href="#"
          className="inline-flex items-center gap-2.5 border border-primary text-primary px-8 py-3.5 font-bold text-[0.8rem] tracking-wider uppercase hover:bg-primary hover:text-white transition-all duration-300"
        >
          Browse All 24,000+ Jobs →
        </Link>
      </div>
    </section>
  )
}

export default FeaturedJobs