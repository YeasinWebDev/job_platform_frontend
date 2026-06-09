import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Dashboard - HirePeople",
  description: "Career management and recruiter portal overview.",
};

const openSans = Open_Sans({
  subsets: ["latin"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${openSans.className} bg-black text-white`}>{children}</div>;
}
