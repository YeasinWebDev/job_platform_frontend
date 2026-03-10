"use client";
import Link from "next/link";

export default function CTABanner() {

  return (
    <section id="cta-banner" className="py-32 px-8 lg:px-16 bg-[#111110] relative overflow-hidden">
      {/* Background text */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 font-extrabold text-[10rem] text-primary/5 whitespace-nowrap pointer-events-none leading-none tracking-[-0.05em]"
      >
        HirePeople
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 reveal">
        <div className="flex items-center justify-center gap-2.5 mb-4">
          <span className="text-primary text-[0.7rem] tracking-[0.18em] uppercase">Ready?</span>
        </div>

        <h2 className="font-syne font-extrabold text-[clamp(2.4rem,4vw,4rem)] leading-[1.05] tracking-[-0.03em] text-cream mb-5">
          Your Next Chapter<br />
          Starts{" "}
          <em className=" font-instrument italic text-primary">Today</em>
        </h2>

        <p className="text-[0.98rem] leading-[1.75] text-mist-500 mb-11 max-w-xl mx-auto">
          Join 2 million professionals who've trusted Apexhire to find the work
          that truly defines them. Create your profile in under 5 minutes.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="#"
            className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/50 text-bg font-bold text-[0.83rem] tracking-wider uppercase px-9 py-4 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Started — It&apos;s Free
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2.5 border border-primary text-primary px-8 py-4 font-bold text-[0.8rem] tracking-wider uppercase hover:bg-primary hover:text-white transition-all duration-200"
          >
            Browse Jobs First →
          </Link>
        </div>
      </div>
    </section>
  );
}
