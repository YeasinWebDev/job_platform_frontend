"use client";

import { motion } from "framer-motion";

const floatingJobs = [
  {
    company: "Stripe Inc.",
    role: "Senior Product Designer",
    tags: ["Remote", "Full-time"],
    salary: "$140K – $180K",
    pos: "top-[22%] left-[6%]",
  },
  {
    company: "Linear App",
    role: "Staff Engineer, Frontend",
    tags: ["San Francisco", "Hybrid"],
    salary: "$190K – $240K",
    pos: "top-[42%] right-[5%]",
  },
  {
    company: "Anthropic",
    role: "ML Research Scientist",
    tags: ["New Listing", "On-site"],
    salary: "$220K – $320K",
    pos: "bottom-[20%] left-[14%]",
  },
];

export default function FloatingJobs() {
  return (
    <>
      {floatingJobs.map((job, i) => (
        <motion.div
          key={job.role}
          className={`absolute bg-black border border-gray-900 p-5 min-w-[230px] ${job.pos}`}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <div className="text-[0.68rem] tracking-[0.12em] uppercase text-muted mb-2">
            {job.company}
          </div>

          <div className="font-bold text-[0.93rem] text-cream mb-2">
            {job.role}
          </div>

          <div className="flex gap-2 flex-wrap mt-2">
            {job.tags.map((t, i) => (
              <span
                key={t}
                className={`text-[0.65rem] px-2.5 py-1 border tracking-wider ${
                  i === 0
                    ? "border-gray-900 text-gold"
                    : "border-gray-900 text-muted"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="font-bold text-[1rem] text-cream mt-3">
            {job.salary}
          </div>
        </motion.div>
      ))}
    </>
  );
}