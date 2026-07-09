"use client";

import { motion, easeOut } from "framer-motion";
import Link from "next/link";
import CommonHeader from "../CommonHeader";

type Category = {
  id: string;
  name: string;
};

const categoryIcons: Record<string, string> = {
  Engineering: "💻",
  "Design & UX": "🎨",
  "Data & Analytics": "📊",
  Product: "🚀",
  Marketing: "📣",
  Finance: "💰",
  Legal: "⚖️",
  "Research & AI": "🔬",
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

function Categories({ categories }: { categories: Category[] }) {
  return (
    <section id="categories" className="py-28 px-8 lg:px-16">
      {/* Header */}

      <CommonHeader subText="Explore Fields" title="Browse by" subTitle="Category" link="#" linkText="View All Categories" />
      
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/15">
        {categories.map((cat, i) => (
          <Link href={`/job?category=${encodeURIComponent(cat.id)}`} key={cat.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.15,
                ease: "easeOut",
              }}
              className="bg-black hover:scale-[98%] p-8 relative overflow-hidden cursor-pointer transition-all duration-300 h-full"
            >
              <div className="w-12 h-12 border border-gray-800 flex items-center justify-center text-2xl mb-5">
                {categoryIcons[cat.name] ?? "📁"}
              </div>

              <div className="font-syne font-bold text-[0.98rem] text-cream mb-1.5">{cat.name}</div>

              <div className="text-[0.78rem] text-muted">Explore roles</div>

              <div className="absolute bottom-6 right-6 text-muted text-base">↗</div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
