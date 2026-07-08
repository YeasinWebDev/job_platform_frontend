import "../globals.css";
import Footer from "@/components/Footer";
import NavbarWrapper from "@/components/NavbarWrapper";

export const dynamic = 'force-dynamic';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarWrapper/>
      {children}
      <Footer />
    </>
  );
}
