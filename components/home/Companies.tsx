"use client";
import Link from "next/link";
import CommonHeader from "../CommonHeader";

const companies = [
  { initials: "ST", name: "Stripe", jobs: "142 jobs" },
  { initials: "OA", name: "OpenAI", jobs: "89 jobs" },
  { initials: "FG", name: "Figma", jobs: "61 jobs" },
  { initials: "VR", name: "Vercel", jobs: "47 jobs" },
  { initials: "NT", name: "Notion", jobs: "38 jobs" },
  { initials: "LN", name: "Linear", jobs: "24 jobs" },
  { initials: "AN", name: "Anthropic", jobs: "95 jobs" },
  { initials: "AR", name: "Airbnb", jobs: "78 jobs" },
  { initials: "SL", name: "Slack", jobs: "55 jobs" },
  { initials: "DD", name: "Datadog", jobs: "112 jobs" },
];

// Duplicated for seamless loop
const track = [...companies, ...companies];

export default function Companies() {

  return (
    <section id="companies" className="py-28 bg-bg2 overflow-hidden">
      {/* Header */}
      <div className="px-8 lg:px-16">
      <CommonHeader subText="Hiring Partners" title="World-Class" subTitle="Companies" link="#" linkText="For Employers" />
      </div>


      {/* Marquee */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {track.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="company-pill flex items-center cursor-pointer gap-3 px-9 py-[18px] border border-primary/15 -mr-px min-w-[200px] hover:border-primary/50 transition-all duration-200"
            >
              <div className="w-8 h-8 bg-primary/10 flex items-center justify-center font-extrabold text-[0.75rem] text-primary flex-shrink-0">
                {c.initials}
              </div>
              <div>
                <div className="text-[0.85rem] text-cream font-medium whitespace-nowrap">{c.name}</div>
                <div className="text-[0.68rem] text-muted">{c.jobs}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 text-center px-8 reveal">
        <Link
          href="#"
          className="inline-flex items-center gap-2.5 border border-primary text-primary px-8 py-3.5  font-bold text-[0.8rem] tracking-wider uppercase hover:bg-primary hover:text-white transition-all duration-300"
        >
          Post Your First Job →
        </Link>
      </div>
    </section>
  );
}
