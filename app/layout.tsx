import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HirePeople",
  description: " Find Work That Defines You",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}