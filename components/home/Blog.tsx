"use client";

import { useState } from "react";
import CommonHeader from "../CommonHeader";
import { motion } from "framer-motion";

const featuredPost = {
  id: 0,
  title: "The Future of Work: How AI is Transforming the Job Market in 2024",
  excerpt: "Discover how artificial intelligence is reshaping recruitment, creating new opportunities, and what it means for your career trajectory. From automated screening to personalized job matching, AI is revolutionizing how we find and fill positions.",
  date: "2024-01-20",
  readTime: "10 min read",
  category: "Work Trends",
  author: "Sarah Chen",
  authorRole: "Career Strategist",
};

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Writing a Standout Resume",
    excerpt: "Learn how to craft a resume that catches recruiters' attention and highlights your key achievements with modern formatting techniques.",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Career Tips",
    author: "Michael Torres",
  },
  {
    id: 2,
    title: "How to Ace Your Next Job Interview",
    excerpt: "Master the art of interviewing with these proven strategies and techniques from hiring experts at top companies.",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Interview Prep",
    author: "Emily Watson",
  },
  {
    id: 3,
    title: "Remote Work: The Future of Employment",
    excerpt: "Explore the benefits and challenges of remote work and how to thrive in a distributed team environment.",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Work Trends",
    author: "David Kim",
  },
  {
    id: 4,
    title: "Negotiating Your Salary: A Complete Guide",
    excerpt: "Get the compensation you deserve with these salary negotiation tips and tactics from HR professionals.",
    date: "2024-01-01",
    readTime: "8 min read",
    category: "Career Tips",
    author: "Sarah Chen",
  },
  {
    id: 5,
    title: "Building a Strong Professional Network",
    excerpt: "Discover how to expand your professional network and create meaningful connections that advance your career.",
    date: "2023-12-28",
    readTime: "5 min read",
    category: "Networking",
    author: "James Rodriguez",
  },
  {
    id: 6,
    title: "Career Change: How to Make a Successful Transition",
    excerpt: "Planning to switch careers? Here's everything you need to know to make a smooth and successful transition.",
    date: "2023-12-20",
    readTime: "6 min read",
    category: "Career Growth",
    author: "Emily Watson",
  },
  {
    id: 7,
    title: "Mastering LinkedIn: Beyond the Basics",
    excerpt: "Take your LinkedIn profile to the next level with advanced strategies for personal branding and networking.",
    date: "2023-12-15",
    readTime: "7 min read",
    category: "Networking",
    author: "Michael Torres",
  },
  {
    id: 8,
    title: "Work-Life Balance: Setting Boundaries in the Modern Workplace",
    excerpt: "Learn practical strategies for maintaining a healthy work-life balance in today's always-connected world.",
    date: "2023-12-10",
    readTime: "5 min read",
    category: "Wellness",
    author: "David Kim",
  },
];

const categories = [
  "All Posts",
  "Career Tips",
  "Interview Prep",
  "Work Trends",
  "Networking",
  "Career Growth",
  "Wellness",
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  const filteredPosts = selectedCategory === "All Posts" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section id="blog-hero" className="py-32 px-8 lg:px-16 relative overflow-hidden">
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
              Career Insights
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-syne font-extrabold text-[clamp(2.8rem,5vw,5rem)] leading-[1.05] tracking-[-0.03em] text-cream mb-6"
          >
            Expert Advice for
            <br />
            <em className="font-instrument italic text-primary">Career Success</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[0.98rem] leading-[1.75] text-muted max-w-2xl mx-auto"
          >
            Stay ahead with the latest insights, tips, and strategies from industry experts. Your journey to professional excellence starts here.
          </motion.p>
        </div>
      </section>

      {/* Featured Post Section */}
      <section id="featured" className="py-20 px-8 lg:px-16 bg-bg2 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <CommonHeader subText="Featured Article" title="Editor's" subTitle="Pick" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 group cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-6xl mb-4 block">🤖</span>
                  <span className="text-primary text-[0.7rem] tracking-[0.18em] uppercase font-medium">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary text-[0.7rem] tracking-[0.18em] uppercase font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-muted text-[0.7rem]">•</span>
                  <span className="text-muted text-[0.7rem]">{featuredPost.readTime}</span>
                </div>

                <h2 className="font-syne font-extrabold text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] tracking-[-0.02em] text-cream mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-[0.9rem] leading-[1.8] text-muted mb-6">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        {featuredPost.author.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <div className="text-cream text-sm font-medium">{featuredPost.author}</div>
                      <div className="text-muted text-xs">{featuredPost.authorRole}</div>
                    </div>
                  </div>

                  <div className="text-primary text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read More →
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="pt-12 px-8 lg:px-16 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, i) => (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === category
                    ? "bg-primary text-bg"
                    : "bg-transparent border border-primary/30 text-primary hover:bg-primary/10"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section id="posts" className="pt-20 pb-36 px-8 lg:px-16 relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <CommonHeader subText="Latest Articles" title="Stay Informed," subTitle="Stay Ahead" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                key={post.id}
                className="bg-black border border-primary/15 rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 group cursor-pointer"
              >
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="text-4xl">📝</span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-primary text-[0.65rem] tracking-[0.15em] uppercase font-semibold">
                      {post.category}
                    </span>
                    <span className="text-muted text-[0.65rem]">•</span>
                    <span className="text-muted text-[0.65rem]">{post.readTime}</span>
                  </div>

                  <h3 className="font-syne font-bold text-[1.05rem] text-cream mb-3 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-[0.85rem] leading-[1.75] text-muted mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary text-xs font-bold">
                          {post.author.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <span className="text-muted text-xs">{post.author}</span>
                    </div>

                    <span className="text-muted text-xs">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-36 px-8 lg:px-16 bg-bg2 relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <div className="w-10 h-px bg-primary" />
              <span className="text-primary text-[0.7rem] tracking-[0.18em] uppercase font-medium">
                Stay Updated
              </span>
              <div className="w-10 h-px bg-primary" />
            </div>

            <h2 className="font-syne font-extrabold text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-cream mb-4">
              Never Miss an <em className="font-instrument italic text-primary">Insight</em>
            </h2>

            <p className="text-[0.95rem] leading-[1.75] text-muted max-w-xl mx-auto">
              Subscribe to our newsletter and get the latest career tips, industry insights, and job opportunities delivered straight to your inbox.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-black border border-primary/20 rounded-xl p-8 md:p-10"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-black border border-primary/30 rounded-lg text-white placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
              />
              <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-bg font-bold text-[0.83rem] tracking-wider uppercase rounded-lg transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>

            <p className="text-muted text-xs mt-4 text-center">
              Join 50,000+ professionals. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="blog-cta" className="py-32 px-8 lg:px-16 bg-[#111110] relative overflow-hidden">
        {/* Background text */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 font-extrabold text-[10rem] text-primary/5 whitespace-nowrap pointer-events-none leading-none tracking-[-0.05em]"
        >
          Career Growth
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-extrabold text-[clamp(2.4rem,4vw,4rem)] leading-[1.05] tracking-[-0.03em] text-cream mb-5">
              Ready to Take the
              <br />
              <em className="font-instrument italic text-primary">Next Step</em>?
            </h2>

            <p className="text-[0.98rem] leading-[1.75] text-mist-500 mb-11 max-w-xl mx-auto">
              Knowledge is power. Combine these insights with action — create your profile and start applying to top positions today.
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