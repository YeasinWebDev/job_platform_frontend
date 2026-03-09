import FloatingJobs from "../FloatingJobs";


export default function Hero() {

  return (
    <section id="hero" className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
      {/* Left */}
      <div className="flex flex-col justify-center px-8 lg:px-16 pt-36 pb-20 relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-7 hero-item hero-item-1">
          <div className="w-10 h-px bg-primary" />
          <span className="text-primary text-[0.72rem] tracking-[0.18em] uppercase font-medium">
            Premium Career Platform
          </span>
        </div>

        {/* Title */}
        <h1 className="font-syne font-extrabold text-[clamp(3rem,5vw,5.5rem)] leading-[1.0] tracking-[-0.03em] text-cream hero-item hero-item-2">
          Find Work<br />
          That{" "}
          <em className=" font-instrument text-primary font-serif italic">Defines</em>
          <br />
          You
        </h1>

        {/* Sub */}
        <p className="mt-6 text-[0.98rem] leading-[1.75] text-muted max-w-md hero-item hero-item-3">
          Apexhire connects exceptional talent with elite companies. No noise,
          no filler — just curated roles built for careers that matter.
        </p>

        {/* Search */}
        <div className="mt-11 flex hero-item hero-item-4">
          <input
            type="text"
            placeholder="Role, skill, or company..."
            className="flex-1 border border-gray-800 border-r-0 px-5 py-4 text-[0.9rem] text-muted/80 placeholder:text-muted/80 outline-none transition-colors duration-200"
          />
          <button className="bg-primary hover:bg-primary/40 text-bg font-bold text-[0.83rem] tracking-wider uppercase px-7 py-4 transition-colors duration-200 cursor-none">
            Search
          </button>
        </div>

        {/* Stats */}
        <div className="mt-14 flex gap-10 hero-item hero-item-5">
          {[
            { num: "24", sign: "K+", label: "Live Positions" },
            { num: "8", sign: "K+", label: "Top Companies" },
            { num: "94", sign: "%", label: "Placement Rate" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-syne font-extrabold text-[1.75rem] text-cream">
                {s.num.replace(/\d+/, (n) => (
                  `${n}`
                ))}
                <span className="text-primary/60 ml-1 font-bold">{s.sign}</span>
              </div>
              <div className="text-[0.72rem] text-muted tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="relative hidden lg:block">
        {/* Grid lines */}
        <div className="absolute inset-0 grid-lines" />
        {/* Glow */}
        <div className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 60% 40%, rgba(201,168,76,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 30% 70%, rgba(122,158,126,0.04) 0%, transparent 70%)",
          }}
        />
        <FloatingJobs />
      </div>
    </section>
  );
}
