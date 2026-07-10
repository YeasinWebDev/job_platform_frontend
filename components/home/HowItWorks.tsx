"use client";

import CommonHeader from "../CommonHeader";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    icon: "✍️",
    title: "Create Your Profile",
    desc: "Build a rich, searchable profile in minutes. Showcase your work, skills, and ambitions to stand out from the crowd.",
    details: ["Upload resume", "Add portfolio links", "Set preferences"],
  },
  {
    num: "02",
    icon: "🎯",
    title: "Get Matched",
    desc: "Our intelligent matching engine surfaces roles aligned with your experience, salary expectations, and working preferences.",
    details: ["AI-powered matching", "Salary insights", "Company culture fit"],
  },
  {
    num: "03",
    icon: "📬",
    title: "Apply Instantly",
    desc: "One-click applications with your saved profile. Track every application in your personal dashboard in real-time.",
    details: ["One-click apply", "Application tracking", "Status updates"],
  },
  {
    num: "04",
    icon: "🏆",
    title: "Get Hired",
    desc: "Interview, negotiate, and accept. We celebrate every placement — our success is entirely tied to yours.",
    details: ["Interview prep", "Offer negotiation", "Career growth"],
  },
];

const benefits = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Create your profile in under 5 minutes and start receiving matched opportunities immediately.",
  },
  {
    icon: "🎨",
    title: "Curated Quality",
    desc: "Every job listing is vetted by our team. No spam, no irrelevant postings, no time-wasters.",
  },
  {
    icon: "🔒",
    title: "Privacy First",
    desc: "Your profile is visible only to employers you choose. Full control over your job search.",
  },
];

export default function HowItWorks() {

  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section id="how-it-works-hero" className="py-32 px-8 lg:px-16 relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2.5 mb-6"
          >
            <div className="w-10 h-px bg-primary" />
            <span className="text-primary text-[0.7rem] tracking-[0.18em] uppercase font-medium">
              How It Works
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-syne font-extrabold text-[clamp(2.8rem,5vw,5rem)] leading-[1.05] tracking-[-0.03em] text-cream mb-6"
          >
            Your Journey to
            <br />
            <em className="font-instrument italic text-primary">Dream Career</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[0.98rem] leading-[1.75] text-muted max-w-2xl mx-auto"
          >
            Getting started is simple. Follow our proven four-step process to land your next role in record time.
          </motion.p>
        </div>
      </section>

      {/* Steps Section */}
      <section id="steps" className="py-36 px-8 lg:px-16 bg-bg2 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <CommonHeader subText="The Process" title="Four Simple" subTitle="Steps" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="absolute top-16 left-[12.5%] right-[12.5%] h-px hidden lg:block"
              style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.2), rgba(201,168,76,0.2), transparent)" }}
            />

            {steps.map((step, i) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                key={step.num}
                className="relative"
              >
                {/* Number circle */}
                <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center font-extrabold text-primary text-[1rem] mx-auto mb-6 relative z-10 bg-bg2">
                  {step.num}
                </div>

                <div className="text-center">
                  <span className="text-4xl block mb-4">{step.icon}</span>
                  <h3 className="font-syne font-bold text-[1.1rem] text-cream mb-3">{step.title}</h3>
                  <p className="text-[0.88rem] leading-[1.75] text-muted mb-6">{step.desc}</p>

                  {/* Feature list */}
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-[0.8rem] text-mist-500">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-36 px-8 lg:px-16 relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <CommonHeader subText="Why Choose Us" title="Built for" subTitle="Your Success" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                key={benefit.title}
                className="bg-black border border-primary/15 rounded-xl p-10 text-center hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                <h3 className="font-syne font-bold text-[1.1rem] text-cream mb-3">{benefit.title}</h3>
                <p className="text-[0.88rem] leading-[1.75] text-muted">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-36 px-8 lg:px-16 bg-bg2 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <CommonHeader subText="By The Numbers" title="Trusted by" subTitle="Professionals" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "4", suffix: " Simple Steps", label: "To Get Started" },
              { num: "5", suffix: " Minutes", label: "To Create Profile" },
              { num: "24", suffix: " Hours", label: "Average Response" },
              { num: "94", suffix: "%", label: "Success Rate" },
            ].map((stat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={stat.label}
                className="text-center"
              >
                <div className="font-syne font-extrabold text-[clamp(2.5rem,4vw,3.5rem)] text-cream mb-2">
                  {stat.num}
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                <div className="text-[0.8rem] text-muted tracking-wider uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-32 px-8 lg:px-16 bg-[#111110] relative overflow-hidden">
        {/* Background text */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 font-extrabold text-[10rem] text-primary/5 whitespace-nowrap pointer-events-none leading-none tracking-[-0.05em]"
        >
          Get Started
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-extrabold text-[clamp(2.4rem,4vw,4rem)] leading-[1.05] tracking-[-0.03em] text-cream mb-5">
              Ready to Start Your
              <br />
              <em className="font-instrument italic text-primary">Journey</em>?
            </h2>

            <p className="text-[0.98rem] leading-[1.75] text-mist-500 mb-11 max-w-xl mx-auto">
              Join 2 million professionals who've transformed their careers with Apexhire. Your next chapter is just 4 steps away.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/auth"
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/50 text-bg font-bold text-[0.83rem] tracking-wider uppercase px-9 py-4 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started — It's Free
              </a>
              <a
                href="/job"
                className="inline-flex items-center gap-2.5 border border-primary text-primary px-8 py-4 font-bold text-[0.8rem] tracking-wider uppercase hover:bg-primary hover:text-white transition-all duration-200"
              >
                Browse Jobs First →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}