"use client";

import Link from "next/link";
import React from "react";
import { motion, easeOut } from "framer-motion";
import CommonHeader from "../CommonHeader";

const categories = [
  { icon: "💻", name: "Engineering", count: "6,400+ positions" },
  { icon: "🎨", name: "Design & UX", count: "2,800+ positions" },
  { icon: "📊", name: "Data & Analytics", count: "3,100+ positions" },
  { icon: "🚀", name: "Product", count: "1,900+ positions" },
  { icon: "📣", name: "Marketing", count: "2,200+ positions" },
  { icon: "💰", name: "Finance", count: "1,600+ positions" },
  { icon: "⚖️", name: "Legal", count: "880+ positions" },
  { icon: "🔬", name: "Research & AI", count: "4,700+ positions" },
];

// container animation
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

// card animation
const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

function Categories() {
  return (
    <section id="categories" className="py-28 px-8 lg:px-16">
      {/* Header */}

      <CommonHeader subText="Explore Fields" title="Browse by" subTitle="Category" link="#" linkText="View All Categories" />
      
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/15">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.4,
              delay: i * 0.15,
              ease: "easeOut",
            }}
            className="bg-black hover:scale-[98%] p-8 relative overflow-hidden cursor-pointer transition-all duration-300"
          >
            <div className="w-12 h-12 border border-gray-800 flex items-center justify-center text-2xl mb-5">{cat.icon}</div>

            <div className="font-syne font-bold text-[0.98rem] text-cream mb-1.5">{cat.name}</div>

            <div className="text-[0.78rem] text-muted">{cat.count}</div>

            <div className="absolute bottom-6 right-6 text-muted text-base">↗</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
