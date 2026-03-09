import { motion, } from "framer-motion";
import Link from "next/link";

function CommonHeader({subText="", title="", subTitle="", link='#', linkText=""}:{subText?:string, title?:string, subTitle?:string, link?:string, linkText?:string}) {
  return (
     <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6"
      >
        <div>
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="w-7 h-px bg-primary" />
            <span className="text-primary text-[0.7rem] tracking-[0.18em] uppercase">{subText}</span>
          </div>

          <h2 className="font-syne font-extrabold text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-cream">
            {title} <em className="font-instrument italic text-primary">{subTitle}</em>
          </h2>
        </div>

        {linkText && <Link href={link} className="text-primary text-[0.8rem] tracking-[0.08em] uppercase flex items-center gap-2 font-medium hover:scale-105 transition-all duration-200">
          {linkText} →
        </Link>}
      </motion.div>
  )
}

export default CommonHeader