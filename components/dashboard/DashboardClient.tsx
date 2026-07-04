"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/services/auth/auth";
import Sidebar from "./Sidebar";
import Header from "./Header";
import UserDashboard from "./UserDashboard";
import RecruiterDashboard from "./RecruiterDashboard";
import AdminDashboard from "./AdminDashboard";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { UserType } from "@/types/jobTypes";

interface DashboardClientProps {
  initialUser: UserType;
}

export default function DashboardClient({ initialUser }: DashboardClientProps) {
  const router = useRouter();

  // Role selection state (defaults to actual role, but switchable for demo purposes)
  const [role, setRole] = useState<"USER" | "RECRUITER" | "ADMIN">(initialUser?.role || "USER");
  const [activeTab, setActiveTab] = useState("overview");


  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Re-synchronize role if backend user changes
  useEffect(() => {
    if (initialUser?.role) {
      setRole(initialUser.role);
    }
  }, [initialUser]);

  useEffect(() => {
    const savedTab = JSON.parse(localStorage.getItem("activeTab")!);
    if (savedTab) {
      setActiveTab(savedTab);
    }else{
      setActiveTab("overview");
    }
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logged out successfully");
    router.push("/auth");
    router.refresh();
    localStorage.removeItem("activeTab");
  };

  const [mockData, setMockData] = useState({
    // USER layout mock data
    applications: [
      {
        id: "app-1",
        jobTitle: "Senior React Developer",
        company: "Stripe",
        location: "San Francisco, CA (Remote)",
        dateApplied: "2026-05-15T09:30:00Z",
        status: "SHORTLISTED",
        resume: initialUser?.userInfo?.resume || "https://example.com/my-resume.pdf"
      },
      {
        id: "app-2",
        jobTitle: "Full Stack Engineer",
        company: "Airbnb",
        location: "New York, NY (Hybrid)",
        dateApplied: "2026-05-20T14:45:00Z",
        status: "APPLIED",
        resume: initialUser?.userInfo?.resume || "https://example.com/my-resume.pdf"
      },
      {
        id: "app-3",
        jobTitle: "UX Engineer",
        company: "Vercel",
        location: "Remote",
        dateApplied: "2026-05-02T11:00:00Z",
        status: "REJECTED",
        resume: initialUser?.userInfo?.resume || "https://example.com/my-resume.pdf"
      }
    ],
    savedJobs: [
      {
        id: "job-save-1",
        title: "Frontend Architect",
        company: "Figma",
        location: "Remote",
        dateSaved: "2026-06-01T10:15:00Z"
      },
      {
        id: "job-save-2",
        title: "Senior Product Designer",
        company: "Linear",
        location: "San Francisco, CA",
        dateSaved: "2026-06-03T16:00:00Z"
      }
    ],

    // RECRUITER layout mock data
    jobs: [
      {
        id: "rec-job-1",
        title: "Staff JavaScript Engineer",
        company: initialUser?.recruiter?.companyName || "HirePeople Co",
        location: "London, UK (Remote)",
        status: "ACTIVE",
        vacancies: 2,
        applicantsCount: 4,
        createdAt: "2026-05-10T08:00:00Z"
      },
      {
        id: "rec-job-2",
        title: "Lead UI Developer",
        company: initialUser?.recruiter?.companyName || "HirePeople Co",
        location: "Remote",
        status: "ACTIVE",
        vacancies: 1,
        applicantsCount: 3,
        createdAt: "2026-05-22T11:30:00Z"
      },
      {
        id: "rec-job-3",
        title: "React Native Developer",
        company: initialUser?.recruiter?.companyName || "HirePeople Co",
        location: "Hybrid (New York, NY)",
        status: "INACTIVE",
        vacancies: 1,
        applicantsCount: 1,
        createdAt: "2026-04-15T09:00:00Z"
      }
    ],
    applicants: [
      {
        id: "app-1",
        name: "Jane Smith",
        email: "janesmith@example.com",
        jobTitle: "Staff JavaScript Engineer",
        dateApplied: "2026-05-18T10:00:00Z",
        status: "SHORTLISTED",
        resume: "https://example.com/janesmith-resume.pdf"
      },
      {
        id: "app-2",
        name: "Alex Johnson",
        email: "alexj@example.com",
        jobTitle: "Staff JavaScript Engineer",
        dateApplied: "2026-05-21T15:20:00Z",
        status: "APPLIED",
        resume: "https://example.com/alexj-resume.pdf"
      },
      {
        id: "app-4",
        name: "Michael Brown",
        email: "mbrown@example.com",
        jobTitle: "Lead UI Developer",
        dateApplied: "2026-05-24T09:15:00Z",
        status: "APPLIED",
        resume: "https://example.com/mbrown-resume.pdf"
      }
    ],

    // ADMIN layout mock data
    users: [
      {
        id: "user-1",
        name: initialUser?.name || "John Doe",
        email: initialUser?.email || "johndoe@example.com",
        role: initialUser?.role || "USER",
        status: "ACTIVE"
      },
      {
        id: "user-2",
        name: "Alice Recruiter",
        email: "alice@company.com",
        role: "RECRUITER",
        status: "ACTIVE"
      },
      {
        id: "user-3",
        name: "Super Administrator",
        email: "admin@hirepeople.com",
        role: "ADMIN",
        status: "ACTIVE"
      },
      {
        id: "user-4",
        name: "Spammy Bob",
        email: "bob@spam.com",
        role: "USER",
        status: "BANNED"
      }
    ],
    adminJobs: [
      {
        id: "adm-job-1",
        title: "Security Operations Analyst",
        company: "DefenseCorp",
        status: "ACTIVE",
        createdAt: "2026-06-01T08:00:00Z"
      },
      {
        id: "adm-job-2",
        title: "Cryptocurrency Market Researcher",
        company: "ShadyCoins Inc",
        status: "PENDING",
        createdAt: "2026-06-07T14:00:00Z"
      },
      {
        id: "adm-job-3",
        title: "Senior Product Marketing Manager",
        company: "Microsoft",
        status: "ACTIVE",
        createdAt: "2026-05-29T10:15:00Z"
      }
    ]
  });
  

  return (
    <div className="min-h-screen bg-[#0a0a09] text-white flex">
      {/* ══ DESKTOP SIDEBAR ════════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        <Sidebar
          role={role}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          user={initialUser}
          handleLogout={handleLogout}
        />
      </div>

      {/* ══ MOBILE SIDEBAR DRAWER ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black lg:hidden"
            />
            {/* Drawer Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-64 lg:hidden"
            >
              <Sidebar
                role={role}
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setMobileOpen(false);
                }}
                collapsed={false}
                setCollapsed={() => { }}
                user={initialUser}
                handleLogout={handleLogout}
              />
              {/* Close Button on Mobile Drawer */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-4 p-1 rounded-md bg-white/5 border border-white/5 text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══ MAIN VIEWPORT CONTAINER ════════════════════════════════════════ */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-64"
          }`}
      >
        <Header
          role={role}
          setRole={setRole}
          activeTab={activeTab}
          user={initialUser}
          setMobileOpen={setMobileOpen}
          mobileOpen={mobileOpen}
        />

        {/* Content Body */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${role}-${activeTab}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {role === "USER" && (
                <UserDashboard
                  activeTab={activeTab}
                  user={initialUser}
                  mockData={mockData}
                  setMockData={setMockData}
                />
              )}
              {role === "RECRUITER" && (
                <RecruiterDashboard
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  user={initialUser}
                  mockData={mockData}
                  setMockData={setMockData}
                />
              )}
              {role === "ADMIN" && (
                <AdminDashboard
                  activeTab={activeTab}
                  user={initialUser}
                  mockData={mockData}
                  setMockData={setMockData}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
