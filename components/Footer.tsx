import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-8 lg:px-16 py-14 border-t border-primary/15 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="font-syne font-extrabold text-[1.2rem] text-cream">
        Hire<span className="text-primary">People</span>
      </div>

      <ul className="flex flex-wrap gap-7 list-none">
        {["Privacy", "Terms", "About", "Careers", "Contact"].map((item) => (
          <li key={item}>
            <Link
              href="#"
              className="text-mist-400 text-[0.78rem] hover:text-primary/80 transition-colors duration-200"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <div className="text-mist-500 text-[0.75rem]">© 2026 HirePeople Inc.</div>
    </footer>
  );
}
