"use client";

import React, { useState } from "react";
import { Menu, Bell, ChevronDown, MonitorPlay, ShieldCheck, UserCheck, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  role: "USER" | "RECRUITER" | "ADMIN";
  setRole: (role: "USER" | "RECRUITER" | "ADMIN") => void;
  activeTab: string;
  user: any;
  setMobileOpen: (open: boolean) => void;
  mobileOpen: boolean;
}

export default function Header({
  role,
  setRole,
  activeTab,
  user,
  setMobileOpen,
  mobileOpen
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Format tab title to human-readable format
  const getTabTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Dashboard Overview";
      case "applied":
        return "My Applied Jobs";
      case "saved":
        return "Saved Job Listings";
      case "profile":
        return "My Profile Summary";
      case "manage-jobs":
        return "Job Listings Management";
      case "post-job":
        return "Post a New Opportunity";
      case "applicants":
        return "Candidate Applications";
      case "manage-users":
        return "User & Role Directory";
      case "settings":
        return "Platform Configuration";
      default:
        return "Dashboard";
    }
  };

  const getRoleColor = (r: string) => {
    switch (r) {
      case "ADMIN":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "RECRUITER":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      default:
        return "text-primary bg-primary/10 border-primary/20";
    }
  };

  const getRoleIcon = (r: string) => {
    switch (r) {
      case "ADMIN":
        return ShieldCheck;
      case "RECRUITER":
        return Building;
      default:
        return UserCheck;
    }
  };

  const ActiveRoleIcon = getRoleIcon(role);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#0a0a09]/80 px-4 md:px-8 backdrop-blur-md">
      {/* Left section: Hamburger (mobile) + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 -ml-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white cursor-pointer lg:hidden"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-base md:text-lg font-bold text-white tracking-tight hidden sm:block">
          {getTabTitle()}
        </h1>
      </div>

      {/* Right section: Demo Role Switcher + Notifications + User Info */}
      <div className="flex items-center gap-3">
        {/* DEMO ROLE SWITCHER */}
        {/* <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide cursor-pointer transition-all hover:bg-white/[0.04] bg-[#121211] border-white/10"
          >
            <MonitorPlay size={13} className="text-primary animate-pulse" />
            <span className="text-gray-400">Demo Role:</span>
            <span className="text-white font-black">{role}</span>
            <ChevronDown size={12} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-[#121211] border border-white/10 shadow-2xl p-1 z-50 overflow-hidden"
                >
                  <div className="px-3 py-2 border-b border-white/5">
                    <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Switch view role</p>
                  </div>
                  {(["USER", "RECRUITER", "ADMIN"] as const).map((r) => {
                    const RoleIcon = getRoleIcon(r);
                    return (
                      <button
                        key={r}
                        onClick={() => {
                          setRole(r);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-left cursor-pointer ${
                          role === r
                            ? "bg-primary/10 text-primary"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <RoleIcon size={14} className={role === r ? "text-primary" : "text-gray-400"} />
                        {r}
                      </button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div> */}

        {/* NOTIFICATIONS */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer relative"
          >
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
          </button>

          <AnimatePresence>
            {notificationsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 rounded-xl bg-[#121211] border border-white/10 shadow-2xl p-1.5 z-50"
                >
                  <div className="flex justify-between items-center px-3 py-2 border-b border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-300 font-black">Notifications</p>
                    <span className="text-[9px] text-primary hover:underline cursor-pointer">Mark all as read</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1 divide-y divide-white/5">
                    <div className="p-3 text-xs hover:bg-white/[0.02] transition-colors rounded-lg">
                      <p className="font-semibold text-white">Application Shortlisted! 🎉</p>
                      <p className="text-gray-400 mt-1 leading-relaxed">Your application for Senior React Engineer at Stripe was shortlisted.</p>
                      <span className="text-[9px] text-gray-500 block mt-2">2 hours ago</span>
                    </div>
                    <div className="p-3 text-xs hover:bg-white/[0.02] transition-colors rounded-lg">
                      <p className="font-semibold text-white">New applicant registered</p>
                      <p className="text-gray-400 mt-1 leading-relaxed">John Doe applied to your Post: &quot;Full Stack Developer&quot;.</p>
                      <span className="text-[9px] text-gray-500 block mt-2">1 day ago</span>
                    </div>
                    <div className="p-3 text-xs hover:bg-white/[0.02] transition-colors rounded-lg">
                      <p className="font-semibold text-white">System update</p>
                      <p className="text-gray-400 mt-1 leading-relaxed">Platform performance updates and bug fixes successfully applied.</p>
                      <span className="text-[9px] text-gray-500 block mt-2">2 days ago</span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* PROFILE CHIP */}
        <div className={`hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${getRoleColor(role)}`}>
          {React.createElement(getRoleIcon(role), { size: 12 })}
          <span className="uppercase tracking-wider font-bold">{role}</span>
        </div>
      </div>
    </header>
  );
}
