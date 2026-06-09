"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Bookmark,
  User,
  PlusCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building,
  ShieldCheck,
  UserCheck
} from "lucide-react";

interface SidebarProps {
  role: "USER" | "RECRUITER" | "ADMIN";
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  user: any;
  handleLogout: () => void;
}

export default function Sidebar({
  role,
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  user,
  handleLogout
}: SidebarProps) {
  // Define menu items based on role
  const getMenuItems = () => {
    switch (role) {
      case "USER":
        return [
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "applied", label: "Applied Jobs", icon: FileText },
          { id: "saved", label: "Saved Jobs", icon: Bookmark },
          { id: "profile", label: "Profile Preview", icon: User },
        ];
      case "RECRUITER":
        return [
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "manage-jobs", label: "Manage Jobs", icon: Briefcase },
          { id: "post-job", label: "Post a Job", icon: PlusCircle },
          { id: "applicants", label: "Applicants", icon: Users },
        ];
      case "ADMIN":
        return [
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "manage-users", label: "Manage Users", icon: Users },
          { id: "manage-jobs", label: "Manage Jobs", icon: Briefcase },
          { id: "settings", label: "System Settings", icon: Settings },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-[#0d0d0c] border-r border-white/5 transition-all duration-300 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Brand/Logo */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white select-none">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center font-black text-sm text-white">
              H
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg"
              >
                Hire<span className="text-primary">People</span>
              </motion.span>
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer hidden md:block"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Collapsed Toggle Button */}
        {collapsed && (
          <div className="flex justify-center py-4 border-b border-white/5">
            <button
              onClick={() => setCollapsed(false)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Menu Navigation */}
        <nav className="p-4 space-y-1.5">
          <p className={`text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-4 px-2 ${collapsed ? "text-center" : ""}`}>
            {collapsed ? "Menu" : `${role} Dashboard`}
          </p>
          
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group cursor-pointer relative ${
                      isActive
                        ? "text-white font-medium bg-primary/20 border-l-2 border-primary"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`shrink-0 transition-colors ${
                        isActive ? "text-primary" : "text-gray-400 group-hover:text-white"
                      }`}
                    />
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {isActive && !collapsed && (
                      <motion.div
                        layoutId="active-sidebar-pill"
                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-white/5 bg-white/[0.01]">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-white shrink-0 relative">
            {user?.name?.split(" ")[0].charAt(0).toUpperCase() || "U"}
            {role === "ADMIN" && (
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5" title="Admin">
                <ShieldCheck size={10} className="text-white" />
              </span>
            )}
            {role === "RECRUITER" && (
              <span className="absolute -top-1 -right-1 bg-amber-500 rounded-full p-0.5" title="Recruiter">
                <Building size={10} className="text-white" />
              </span>
            )}
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || "User"}</p>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                {role}
              </span>
            </div>
          )}
        </div>

        {!collapsed ? (
          <button
            onClick={handleLogout}
            className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2 border border-white/10 hover:border-red-500/30 bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogout}
            title="Logout"
            className="w-full mt-4 flex items-center justify-center p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}
