import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HirePeople",
  description: " Find Work That Defines You",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.variable}>
      <body suppressHydrationWarning={true} className="bg-black text-white">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
