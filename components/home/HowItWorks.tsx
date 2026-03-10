"use client";

import CommonHeader from "../CommonHeader";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    icon: "✍️",
    title: "Create Your Profile",
    desc: "Build a rich, searchable profile in minutes. Showcase your work, skills, and ambitions to stand out from the crowd.",
  },
  {
    num: "02",
    icon: "🎯",
    title: "Get Matched",
    desc: "Our intelligent matching engine surfaces roles aligned with your experience, salary expectations, and working preferences.",
  },
  {
    num: "03",
    icon: "📬",
    title: "Apply Instantly",
    desc: "One-click applications with your saved profile. Track every application in your personal dashboard in real-time.",
  },
  {
    num: "04",
    icon: "🏆",
    title: "Get Hired",
    desc: "Interview, negotiate, and accept. We celebrate every placement — our success is entirely tied to yours.",
  },
];

export default function HowItWorks() {

  return (
    <section id="how-it-works" className="py-36 px-8 lg:px-16 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <CommonHeader subText="Process" title='Four Steps to' subTitle="Hired" />

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 relative">
        {/* Connecting line (desktop only) */}
        <div className="absolute top-7 left-[12.5%] right-[12.5%] h-px hidden lg:block"
          style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.15), rgba(201,168,76,0.15), transparent)" }}
        />

        {steps.map((step, i) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.15, ease: "easeOut" }}
            key={step.num}
            className={`text-center px-8 reveal reveal-delay-${i + 1}`}
          >
            {/* Number circle */}
            <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center font-extrabold text-primary text-[0.95rem] mx-auto mb-7 relative z-10 bg-bg">
              {step.num}
            </div>
            <span className="text-3xl block mb-4">{step.icon}</span>
            <h3 className="font-syne font-bold text-[0.98rem] text-cream mb-3">{step.title}</h3>
            <p className="text-[0.83rem] leading-[1.75] text-mist-500">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
