"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  ShieldAlert,
  FileText,
  UserCheck,
  UserX,
  Check,
  X,
  Trash2,
  Settings,
  TrendingUp,
  AlertTriangle,
  Save,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface AdminDashboardProps {
  activeTab: string;
  user: any;
  mockData: any;
  setMockData: React.Dispatch<React.SetStateAction<any>>;
}

export default function AdminDashboard({
  activeTab,
  user,
  mockData,
  setMockData
}: AdminDashboardProps) {
  // Config Settings
  const [config, setConfig] = useState({
    allowRegistration: true,
    requireApproval: true,
    maintenanceMode: false,
    maxListingDays: "30"
  });

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setConfig((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveConfig = () => {
    toast.success("Platform settings updated successfully!");
  };

  // Toggle User Ban Status
  const handleToggleUserBan = (userId: string) => {
    setMockData((prev: any) => ({
      ...prev,
      users: prev.users.map((u: any) =>
        u.id === userId ? { ...u, status: u.status === "ACTIVE" ? "BANNED" : "ACTIVE" } : u
      )
    }));
    toast.success("User account status updated!");
  };

  // Change User Role
  const handleChangeUserRole = (userId: string, newRole: "USER" | "RECRUITER" | "ADMIN") => {
    setMockData((prev: any) => ({
      ...prev,
      users: prev.users.map((u: any) => (u.id === userId ? { ...u, role: newRole } : u))
    }));
    toast.success("User role updated successfully!");
  };

  // Approve Job
  const handleApproveJob = (jobId: string) => {
    setMockData((prev: any) => ({
      ...prev,
      adminJobs: prev.adminJobs.map((j: any) => (j.id === jobId ? { ...j, status: "ACTIVE" } : j))
    }));
    toast.success("Job posting approved successfully!");
  };

  // Reject Job
  const handleRejectJob = (jobId: string) => {
    setMockData((prev: any) => ({
      ...prev,
      adminJobs: prev.adminJobs.map((j: any) => (j.id === jobId ? { ...j, status: "REJECTED" } : j))
    }));
    toast.success("Job posting rejected.");
  };

  // Delete Job listing
  const handleDeleteAdminJob = (jobId: string) => {
    setMockData((prev: any) => ({
      ...prev,
      adminJobs: prev.adminJobs.filter((j: any) => j.id !== jobId)
    }));
    toast.success("Job listing permanently deleted!");
  };

  switch (activeTab) {
    case "overview":
      return (
        <div className="space-y-6">
          {/* Admin Welcome */}
          <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-r from-red-500/10 via-black to-black p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black text-white">
              Platform Administration: <span className="text-red-400">Control Panel</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              Monitor network health, toggle maintenance policies, approve listings, and resolve user conflicts.
            </p>
          </div>

          {/* Admin Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-[#121211] border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Platform Users</span>
                  <Users className="text-red-400 w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-2xl font-black text-white">{mockData.users.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#121211] border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Recruiters</span>
                  <Activity className="text-amber-400 w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-2xl font-black text-white">
                    {mockData.users.filter((u: any) => u.role === "RECRUITER").length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#121211] border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Platform Jobs</span>
                  <Briefcase className="text-blue-400 w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-2xl font-black text-white">{mockData.adminJobs.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#121211] border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Pending Approvals</span>
                  <ShieldAlert className="text-amber-400 w-4 h-4" />
                </div>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-2xl font-black text-white">
                    {mockData.adminJobs.filter((j: any) => j.status === "PENDING").length}
                  </span>
                  {mockData.adminJobs.filter((j: any) => j.status === "PENDING").length > 0 && (
                    <span className="animate-pulse w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Status log */}
            <Card className="bg-[#121211] border-white/5 lg:col-span-2">
              <CardHeader className="border-b border-white/5 py-4">
                <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Pending Job Approvals</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {mockData.adminJobs
                    .filter((j: any) => j.status === "PENDING")
                    .slice(0, 3)
                    .map((job: any) => (
                      <div key={job.id} className="p-4 hover:bg-white/[0.01] transition-colors flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-white">{job.title}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">By: <span className="text-gray-300">{job.company}</span></p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleApproveJob(job.id)}
                            className="h-8 bg-green-500/10 hover:bg-green-500/20 text-green-400 text-[10px] font-bold border border-green-500/20 px-3 cursor-pointer"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleRejectJob(job.id)}
                            className="h-8 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/20 px-3 cursor-pointer"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  {mockData.adminJobs.filter((j: any) => j.status === "PENDING").length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-xs">
                      All job postings approved. No pending items!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick configuration settings */}
            <Card className="bg-[#121211] border-white/5">
              <CardHeader className="border-b border-white/5 py-4">
                <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">System Status</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">Database Connection</span>
                  <span className="text-green-400 font-bold">Operational</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">SMTP Mail Server</span>
                  <span className="text-green-400 font-bold">Operational</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">AWS S3 Assets</span>
                  <span className="text-green-400 font-bold">Operational</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">Stripe Payment Gateway</span>
                  <span className="text-green-400 font-bold">Operational</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case "manage-users":
      return (
        <Card className="bg-[#121211] border-white/5">
          <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Platform Accounts</CardTitle>
            <span className="text-xs text-gray-400">{mockData.users.length} Users Enrolled</span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/[0.01]">
                    <th className="p-4 font-semibold">User details</th>
                    <th className="p-4 font-semibold">Role</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {mockData.users.map((u: any) => (
                    <tr key={u.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-white">{u.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{u.email}</div>
                      </td>
                      <td className="p-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleChangeUserRole(u.id, e.target.value as any)}
                          className="bg-[#181816] border border-white/10 rounded-md px-2 py-1 text-xs text-white outline-none focus:border-primary"
                        >
                          <option value="USER">USER</option>
                          <option value="RECRUITER">RECRUITER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          u.status === "ACTIVE"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          onClick={() => handleToggleUserBan(u.id)}
                          className={`h-8 text-xs font-semibold px-3 rounded-md cursor-pointer border ${
                            u.status === "ACTIVE"
                              ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20"
                              : "bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/20"
                          }`}
                        >
                          {u.status === "ACTIVE" ? "Ban Account" : "Unban Account"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      );

    case "manage-jobs":
      return (
        <Card className="bg-[#121211] border-white/5">
          <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">All Job Postings</CardTitle>
            <span className="text-xs text-gray-400">{mockData.adminJobs.length} Total Listings</span>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/[0.01]">
                    <th className="p-4 font-semibold">Job Title & Company</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {mockData.adminJobs.map((job: any) => (
                    <tr key={job.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-white">{job.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{job.company}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          job.status === "ACTIVE"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : job.status === "PENDING"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        {job.status === "PENDING" && (
                          <Button
                            onClick={() => handleApproveJob(job.id)}
                            className="h-8 bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/20 px-3.5 cursor-pointer"
                          >
                            Approve
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDeleteAdminJob(job.id)}
                          className="h-8 w-8 p-0 bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-md border border-white/10 cursor-pointer"
                          title="Permanently Delete"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {mockData.adminJobs.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-gray-500 text-xs">
                        No jobs listed on the platform.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      );

    case "settings":
      return (
        <Card className="bg-[#121211] border-white/5">
          <CardHeader className="border-b border-white/5 py-4">
            <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">System Configuration</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4 max-w-lg">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="space-y-0.5">
                  <label className="text-sm font-semibold text-white">Allow User Registration</label>
                  <p className="text-xs text-gray-400">Controls if new sign-ups are enabled platform-wide.</p>
                </div>
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={config.allowRegistration}
                  onChange={handleConfigChange}
                  className="accent-primary/80 w-4.5 h-4.5 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="space-y-0.5">
                  <label className="text-sm font-semibold text-white">Require Manual Job Verification</label>
                  <p className="text-xs text-gray-400">Newly posted jobs must be approved by admin before appearing in search.</p>
                </div>
                <input
                  type="checkbox"
                  name="requireApproval"
                  checked={config.requireApproval}
                  onChange={handleConfigChange}
                  className="accent-primary/80 w-4.5 h-4.5 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="space-y-0.5">
                  <label className="text-sm font-semibold text-white">Platform Maintenance Mode</label>
                  <p className="text-xs text-gray-400">Lock non-admin users from taking actions on database transactions.</p>
                </div>
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={config.maintenanceMode}
                  onChange={handleConfigChange}
                  className="accent-primary/80 w-4.5 h-4.5 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs text-gray-400 uppercase tracking-wide">Maximum Listing Lifespan (Days)</label>
                <select
                  name="maxListingDays"
                  value={config.maxListingDays}
                  onChange={handleConfigChange}
                  className="w-full bg-[#181816] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-primary"
                >
                  <option value="15">15 Days</option>
                  <option value="30">30 Days</option>
                  <option value="60">60 Days</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/5">
              <Button
                onClick={handleSaveConfig}
                className="bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider h-10 px-5 rounded-lg flex items-center gap-2 cursor-pointer"
              >
                <Save size={14} />
                Save Config
              </Button>
            </div>
          </CardContent>
        </Card>
      );

    default:
      return null;
  }
}
