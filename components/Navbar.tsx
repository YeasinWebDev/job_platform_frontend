"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from "./ui/sheet";

import toast from "react-hot-toast";

import { logoutUser } from "@/app/services/auth/auth";

export default function Navbar({ isLoggedIn, user }: { isLoggedIn: boolean; user: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [routes, setRoutes] = useState(["Job", "Companies", "How It Works", "Blog"]);

  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setRoutes(["Job", "Companies", "How It Works", "Blog", "Dashboard"]);
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logout Successful");
    router.push("/auth");
    router.refresh();
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b border-gray-800/50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-xl" : "bg-gradient-to-b from-black/90 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-8 lg:px-16 py-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl tracking-tight text-white">
          Hire<span className="text-primary">People</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {routes.map((item) => (
            <motion.li whileHover={{ y: -2 }} key={item}>
              <Link
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[12px] xl:text-sm uppercase tracking-[0.2em] text-gray-300 hover:text-primary transition-colors duration-200"
              >
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Desktop Auth */}
        <div className="hidden lg:block">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Button onClick={() => router.push("/profile")} className="w-10 h-10 rounded-full cursor-pointer">
                {user?.name?.split(" ")[0].charAt(0).toUpperCase()}
              </Button>
              <Button onClick={handleLogout} className="bg-primary h-10 hover:bg-primary/90 text-white rounded-md px-5 cursor-pointer">
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => router.push("/auth")} className="bg-primary h-10 hover:bg-primary/90 text-white rounded-md px-5 cursor-pointer">
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] bg-black border-l border-gray-800 text-white">
              <SheetHeader className="mb-10">
                <div className="flex items-center justify-between">
                  <Link href="/" className="font-bold text-2xl">
                    Hire<span className="text-primary">People</span>
                  </Link>
                </div>
              </SheetHeader>

              <AnimatePresence>
                <motion.ul
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  {routes.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.08,
                      }}
                    >
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm uppercase tracking-[0.2em] text-gray-300 hover:text-primary transition-colors duration-200 ml-5"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="pt-6 ml-5">
                    {isLoggedIn ? (
                      <Button onClick={handleLogout} className="w-20 bg-primary hover:bg-primary/90 text-white rounded-md h-11">
                        Logout
                      </Button>
                    ) : (
                      <Button onClick={() => router.push("/auth")} className="w-20 bg-primary hover:bg-primary/90 text-white rounded-md h-11">
                        Login
                      </Button>
                    )}
                  </motion.div>
                </motion.ul>
              </AnimatePresence>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
