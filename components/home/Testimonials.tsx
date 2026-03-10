"use client";

import CommonHeader from "../CommonHeader";
import { motion } from "framer-motion";

const testimonials = [
  {
    initials: "AK",
    name: "Aisha Kim",
    role: "Senior Engineer @ Stripe",
    text: "Apexhire completely changed how I approach job searching. I went from 3 months of ghosting to landing a $180K offer at Stripe within three weeks. The quality of listings here is unlike anything else.",
  },
  {
    initials: "MR",
    name: "Marcus Reid",
    role: "VP Engineering @ Vercel",
    text: "As a hiring manager, the talent quality on Apexhire is exceptional. We filled three senior roles in under two weeks — all of whom are still with us and crushing it. Worth every penny.",
  },
  {
    initials: "SP",
    name: "Sofia Pereira",
    role: "Product Designer @ Linear",
    text: "I was relocating internationally and needed a role that understood remote work. Apexhire had me connected to three relevant companies in 48 hours. I now work remotely for a top-tier US startup from Lisbon.",
  },
];

export default function Testimonials() {

  return (
    <section id="testimonials" className="py-36 px-8 lg:px-16">
      {/* Header */}
      <CommonHeader subText="Testimonials" title="What Our" subTitle="Clients Say"/>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/15">
        {testimonials.map((t, i) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.15, ease: "easeOut" }}
            key={i}
            className={`bg-black p-11 reveal reveal-delay-${i + 1}`}
          >
            <div className="font-instrument text-5xl text-primary/40 leading-none mb-5">"</div>
            <p className="text-[0.9rem] leading-[1.8] text-cream/90 font-light mb-7">{t.text}</p>
            <div className="flex items-center gap-3.5 pt-6 border-t border-mist-800">
              <div className="w-11 h-11 rounded-full border border-primary/25 flex items-center justify-center font-syne font-extrabold text-[0.88rem] text-pr bg-black text-primary/70 flex-shrink-0">
                {t.initials}
              </div>
              <div>
                <div className="text-pr text-primary text-[0.72rem] mb-0.5">★★★★★</div>
                <div className="font-syne font-bold text-[0.85rem] text-cream">{t.name}</div>
                <div className="text-[0.72rem] text-muted">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
