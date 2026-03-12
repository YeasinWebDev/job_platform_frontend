"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed border-1 border-gray-800 top-0 w-full z-50 px-8 lg:px-16 py-5 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "bg-bg/95 backdrop-blur-sm border-b border-gold-faint" : "bg-gradient-to-b from-bg/95 to-transparent"
      }`}
    >
      <div className=" font-bold text-[1.35rem] tracking-tight text-cream">
        <Link href="/">Hire<span className="text-primary">People</span></Link>
      </div>

      <ul className="hidden md:flex gap-9 list-none">
        {["Job", "Companies", "How It Works", "Blog"].map((item) => (
          <li key={item}>
            <Link href={`${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-[0.82rem] tracking-widest uppercase hover:text-primary/80 transition-colors duration-200">
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/auth" className="bg-primary text-white px-3 py-2 rounded-lg">
       Login
      </Link>
    </nav>
  );
}
