"use client";

import CommonHeader from "../CommonHeader";
import { motion } from "framer-motion";

const values = [
  {
    num: "01",
    icon: "🎯",
    title: "Mission-Driven",
    desc: "We exist to democratize access to meaningful careers. Every role we surface is vetted for impact, growth, and genuine opportunity — not just another application in the void.",
  },
  {
    num: "02",
    icon: "💎",
    title: "Quality Over Quantity",
    desc: "Unlike platforms flooded with noise, we curate every listing. Our employers are handpicked, our roles are real, and our talent pool is exceptional by design.",
  },
  {
    num: "03",
    icon: "🤝",
    title: "Human-First Approach",
    desc: "Technology enables connection, but people build careers. We prioritize authentic relationships between employers and candidates over algorithmic matching alone.",
  },
  {
    num: "04",
    icon: "🚀",
    title: "Continuous Innovation",
    desc: "We're constantly evolving our platform with cutting-edge tools, AI-powered matching, and insights that help both sides make smarter career decisions.",
  },
];

const stats = [
  { num: "2M+", label: "Active Professionals" },
  { num: "24K+", label: "Live Positions" },
  { num: "8K+", label: "Partner Companies" },
  { num: "94%", label: "Placement Success Rate" },
];

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    desc: "Founded with a vision to transform how exceptional talent connects with world-class companies. Started with a small team of 5 passionate individuals.",
  },
  {
    year: "2021",
    title: "Rapid Growth",
    desc: "Reached 100,000 users and partnered with 500+ companies. Launched our AI-powered matching engine that revolutionized job recommendations.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    desc: "Expanded to 15 countries, opened offices in London and Singapore. Introduced remote-first features that became essential in the new work era.",
  },
  {
    year: "2023",
    title: "Industry Recognition",
    desc: "Named 'Best Job Platform' by TechCrunch. Surpassed 1 million successful placements and launched our premium enterprise solutions.",
  },
  {
    year: "2024",
    title: "The Future",
    desc: "2 million+ professionals trust Apexhire. We're now building the next generation of career tools with predictive analytics and personalized growth paths.",
  },
];

export default function About() {

  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section id="about-hero" className="py-32 px-8 lg:px-16 relative overflow-hidden">
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
              About Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-syne font-extrabold text-[clamp(2.8rem,5vw,5rem)] leading-[1.05] tracking-[-0.03em] text-cream mb-6"
          >
            Building the Future of
            <br />
            <em className="font-instrument italic text-primary">Meaningful Work</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[0.98rem] leading-[1.75] text-muted max-w-2xl mx-auto mb-12"
          >
            Apexhire was born from a simple belief: everyone deserves access to careers that inspire, challenge, and fulfill them. We're not just a job platform — we're a career movement.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-syne font-extrabold text-[clamp(2rem,3vw,3rem)] text-cream mb-2">
                  {stat.num}
                </div>
                <div className="text-[0.72rem] text-muted tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-36 px-8 lg:px-16 bg-bg2 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <CommonHeader subText="Our Mission" title="Why We" subTitle="Exist" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-syne font-bold text-[1.5rem] text-cream mb-6 leading-tight">
                Transforming how people find work that truly matters
              </h3>
              <p className="text-[0.95rem] leading-[1.8] text-muted mb-6">
                The traditional job market is broken. Endless scrolling through irrelevant listings, ghosted applications, and roles that don't align with your ambitions — we've all been there.
              </p>
              <p className="text-[0.95rem] leading-[1.8] text-muted mb-6">
                Apexhire was built to fix this. We combine human curation with intelligent technology to surface opportunities that actually match your skills, values, and career goals. No noise, no filler — just meaningful connections.
              </p>
              <p className="text-[0.95rem] leading-[1.8] text-muted">
                Since 2020, we've helped over 2 million professionals find roles they love and enabled 8,000+ companies to build exceptional teams. Our 94% placement success rate isn't just a metric — it's proof that our approach works.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌟</div>
                  <div className="font-syne font-extrabold text-[clamp(2rem,3vw,2.5rem)] text-cream mb-3">
                    Our Vision
                  </div>
                  <p className="text-[0.95rem] leading-[1.8] text-muted max-w-md">
                    A world where every professional has access to careers that align with their potential, and every company can build teams that drive innovation.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-36 px-8 lg:px-16 relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <CommonHeader subText="Our Values" title="What Drives" subTitle="Us Forward" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 relative">
            {/* Connecting line (desktop only) */}
            <div className="absolute top-7 left-[12.5%] right-[12.5%] h-px hidden lg:block"
              style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.15), rgba(201,168,76,0.15), transparent)" }}
            />

            {values.map((value, i) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.15, ease: "easeOut" }}
                key={value.num}
                className="text-center px-6"
              >
                {/* Number circle */}
                <div className="w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center font-extrabold text-primary text-[0.95rem] mx-auto mb-7 relative z-10 bg-black">
                  {value.num}
                </div>
                <span className="text-3xl block mb-4">{value.icon}</span>
                <h3 className="font-syne font-bold text-[0.98rem] text-cream mb-3">{value.title}</h3>
                <p className="text-[0.83rem] leading-[1.75] text-mist-500">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-36 px-8 lg:px-16 bg-bg2 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <CommonHeader subText="Our Journey" title="From Startup to" subTitle="Global Platform" />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary/15 -translate-x-1/2" />

            {timeline.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={item.year}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="bg-black border border-primary/15 rounded-xl p-8 hover:border-primary/30 transition-all duration-300">
                    <div className="font-syne font-extrabold text-[0.85rem] text-primary mb-2">{item.year}</div>
                    <h3 className="font-syne font-bold text-[1.1rem] text-cream mb-3">{item.title}</h3>
                    <p className="text-[0.85rem] leading-[1.75] text-muted">{item.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-black z-10" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats Section */}
      <section id="team" className="py-36 px-8 lg:px-16 relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <CommonHeader subText="Our Team" title="The People Behind" subTitle="Apexhire" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                role: "Leadership",
                count: "12",
                desc: "Experienced executives driving vision and strategy",
              },
              {
                role: "Engineering",
                count: "45",
                desc: "World-class engineers building the future of work",
              },
              {
                role: "Global Team",
                count: "150+",
                desc: "Diverse talent across 12 countries worldwide",
              },
            ].map((team, i) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                key={team.role}
                className="bg-black border border-primary/15 rounded-xl p-10 text-center hover:border-primary/30 transition-all duration-300"
              >
                <div className="font-syne font-extrabold text-[clamp(3rem,4vw,4rem)] text-cream mb-3">
                  {team.count}
                </div>
                <div className="text-primary text-[0.8rem] tracking-wider uppercase font-medium mb-4">
                  {team.role}
                </div>
                <p className="text-[0.85rem] leading-[1.75] text-muted">{team.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about-cta" className="py-32 px-8 lg:px-16 bg-[#111110] relative overflow-hidden">
        {/* Background text */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 font-extrabold text-[10rem] text-primary/5 whitespace-nowrap pointer-events-none leading-none tracking-[-0.05em]"
        >
          Apexhire
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-extrabold text-[clamp(2.4rem,4vw,4rem)] leading-[1.05] tracking-[-0.03em] text-cream mb-5">
              Ready to Find Work
              <br />
              That <em className="font-instrument italic text-primary">Defines</em> You?
            </h2>

            <p className="text-[0.98rem] leading-[1.75] text-mist-500 mb-11 max-w-xl mx-auto">
              Join 2 million professionals who've trusted Apexhire to build careers they love. Your next chapter starts today.
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