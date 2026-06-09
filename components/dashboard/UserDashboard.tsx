"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Bookmark,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  MapPin,
  TrendingUp,
  Briefcase,
  AlertCircle,
  FileDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserDashboardProps {
  activeTab: string;
  user: any;
  mockData: any;
  setMockData: React.Dispatch<React.SetStateAction<any>>;
}

export default function UserDashboard({ activeTab, user, mockData, setMockData }: UserDashboardProps) {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  // Filter application statuses
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "SHORTLISTED":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "REJECTED":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SHORTLISTED":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "REJECTED":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-amber-400" />;
    }
  };

  // Remove saved job
  const handleRemoveSaved = (jobId: string) => {
    setMockData((prev: any) => ({
      ...prev,
      savedJobs: prev.savedJobs.filter((job: any) => job.id !== jobId)
    }));
  };

  // Render sub-sections based on activeTab
  switch (activeTab) {
    case "overview":
      return (
        <div className="space-y-6">
          {/* Welcome Card */}
          <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-r from-primary/10 via-black to-black p-6 md:p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-xl md:text-2xl font-black text-white">
              Welcome back, <span className="text-primary">{user?.name || "Job Seeker"}</span>!
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              Track your active job applications, review invitations, and manage your professional profile from one central dashboard.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-[#121211] border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Applications</span>
                  <FileText className="text-primary w-4 h-4" />
                </div>
                <div className="mt-2.5 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{mockData.applications.length}</span>
                  <span className="text-xs text-green-400 flex items-center gap-0.5 font-semibold">
                    <TrendingUp size={12} />
                    +1
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#121211] border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Shortlisted</span>
                  <CheckCircle className="text-green-400 w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-2xl font-black text-white">
                    {mockData.applications.filter((a: any) => a.status === "SHORTLISTED").length}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#121211] border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Saved Jobs</span>
                  <Bookmark className="text-amber-400 w-4 h-4" />
                </div>
                <div className="mt-2.5">
                  <span className="text-2xl font-black text-white">{mockData.savedJobs.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#121211] border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Profile Strength</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
                <div className="mt-2.5 flex items-center gap-3">
                  <span className="text-2xl font-black text-white">85%</span>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Applications */}
            <Card className="bg-[#121211] border-white/5 lg:col-span-2">
              <CardHeader className="border-b border-white/5 py-4">
                <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Recent Applications</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {mockData.applications.slice(0, 3).map((app: any) => (
                    <div key={app.id} className="p-4 hover:bg-white/[0.01] transition-colors flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{app.jobTitle}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{app.company}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-500 hidden sm:block">
                          Applied {new Date(app.dateApplied).toLocaleDateString()}
                        </span>
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getStatusBadgeColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {mockData.applications.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-xs">
                      No active applications. Start applying to job listings!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Profile Summary Card */}
            <Card className="bg-[#121211] border-white/5">
              <CardHeader className="border-b border-white/5 py-4">
                <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Profile Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Resume Status</span>
                    <span className="text-green-400 font-semibold flex items-center gap-1">
                      <CheckCircle size={12} />
                      Uploaded
                    </span>
                  </div>
                  {user?.userInfo?.resume && (
                    <a
                      href={user.userInfo.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold border border-white/5 transition-all"
                    >
                      <FileDown size={14} />
                      Download Resume
                    </a>
                  )}
                </div>
                <div className="space-y-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Contact Details</p>
                  <p className="text-xs text-gray-300">
                    <span className="text-gray-500">Email:</span> {user?.email}
                  </p>
                  <p className="text-xs text-gray-300">
                    <span className="text-gray-500">Phone:</span> {user?.userInfo?.phone || "Not set"}
                  </p>
                  <p className="text-xs text-gray-300">
                    <span className="text-gray-500">Location:</span> {user?.userInfo?.location || "Not set"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case "applied":
      return (
        <div className="space-y-6">
          <Card className="bg-[#121211] border-white/5">
            <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Application History</CardTitle>
              <span className="text-xs text-gray-400">{mockData.applications.length} Entries</span>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/[0.01]">
                      <th className="p-4 font-semibold">Job Title & Company</th>
                      <th className="p-4 font-semibold">Date Applied</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {mockData.applications.map((app: any) => (
                      <tr key={app.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-white">{app.jobTitle}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{app.company}</div>
                        </td>
                        <td className="p-4 text-xs text-gray-300">
                          {new Date(app.dateApplied).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getStatusBadgeColor(app.status)}`}>
                            {getStatusIcon(app.status)}
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            onClick={() => setSelectedApplication(app)}
                            className="bg-transparent border border-white/10 hover:bg-white/5 text-xs h-8 px-3 text-white rounded-md cursor-pointer"
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {mockData.applications.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-500 text-xs">
                          You haven't applied to any jobs yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Details Modal */}
          {selectedApplication && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-lg rounded-xl bg-[#121211] border border-white/10 p-6 space-y-5 shadow-2xl relative"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Application Details</span>
                    <h3 className="text-lg font-black text-white mt-1">{selectedApplication.jobTitle}</h3>
                    <p className="text-sm text-gray-400">{selectedApplication.company}</p>
                  </div>
                  <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadgeColor(selectedApplication.status)}`}>
                    {selectedApplication.status}
                  </span>
                </div>

                <div className="space-y-3 text-xs text-gray-300 border-t border-b border-white/5 py-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date Applied:</span>
                    <span>{new Date(selectedApplication.dateApplied).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Job Type:</span>
                    <span>Full-time (Remote)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span>{selectedApplication.location || "San Francisco, CA"}</span>
                  </div>
                  <div className="flex flex-col gap-1.5 pt-2">
                    <span className="text-gray-500">Application Progress:</span>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full ${
                          selectedApplication.status === "SHORTLISTED"
                            ? "bg-green-400 w-full"
                            : selectedApplication.status === "REJECTED"
                            ? "bg-red-400 w-1/3"
                            : "bg-amber-400 w-2/3"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <Button
                    onClick={() => setSelectedApplication(null)}
                    className="bg-white/5 hover:bg-white/10 text-white rounded-md h-9 text-xs font-semibold cursor-pointer border border-white/5"
                  >
                    Close
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-md h-9 text-xs font-semibold cursor-pointer">
                    View Original Listing
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      );

    case "saved":
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockData.savedJobs.map((job: any) => (
              <Card key={job.id} className="bg-[#121211] border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between p-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-bold text-white leading-tight">{job.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{job.company}</p>
                    </div>
                    <Button
                      onClick={() => handleRemoveSaved(job.id)}
                      className="h-7 w-7 p-0 bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-md border border-white/5 cursor-pointer"
                      title="Remove from saved"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-2">
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin size={12} />
                      {job.location}
                    </span>
                    <span className="text-white/10">•</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar size={12} />
                      Posted {new Date(job.dateSaved).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 mt-5 pt-4 border-t border-white/5">
                  <Button className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs h-9 rounded-md cursor-pointer border border-white/5">
                    View Details
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs h-9 rounded-md cursor-pointer">
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}

            {mockData.savedJobs.length === 0 && (
              <div className="col-span-full py-16 text-center text-gray-500 text-sm">
                No saved jobs. Browse job opportunities to add them here!
              </div>
            )}
          </div>
        </div>
      );

    case "profile":
      return (
        <div className="space-y-6">
          <Card className="bg-[#121211] border-white/5">
            <CardHeader className="border-b border-white/5 py-4">
              <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Candidate Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-xl text-white">
                  {user?.name?.split(" ")[0].charAt(0).toUpperCase() || "U"}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{user?.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary border border-primary/20">
                      {user?.role}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${user?.isVerified ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                      {user?.isVerified ? "VERIFIED" : "UNVERIFIED"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Bio & Contact</h4>
                  <div className="space-y-2.5 text-xs text-gray-300">
                    <p><span className="text-gray-500">About Me:</span> {user?.userInfo?.about || "Not set"}</p>
                    <p><span className="text-gray-500">Email:</span> {user?.email}</p>
                    <p><span className="text-gray-500">Phone:</span> {user?.userInfo?.phone || "Not set"}</p>
                    <p><span className="text-gray-500">Location:</span> {user?.userInfo?.location || "Not set"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Professional Assets</h4>
                  <div className="space-y-3 text-xs text-gray-300">
                    {user?.userInfo?.resume ? (
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5">
                        <span className="truncate">Resume Link: {user.userInfo.resume.substring(0, 30)}...</span>
                        <a href={user.userInfo.resume} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1 shrink-0">
                          View <ExternalLink size={10} />
                        </a>
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-red-500/5 border border-red-500/10 text-red-400">No resume uploaded.</div>
                    )}
                    <p><span className="text-gray-500">Website:</span> {user?.userInfo?.website || "Not set"}</p>
                    <p><span className="text-gray-500">LinkedIn:</span> {user?.userInfo?.linkedin || "Not set"}</p>
                    <p><span className="text-gray-500">GitHub:</span> {user?.userInfo?.github || "Not set"}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <a href="/profile">
                  <Button className="bg-primary hover:bg-primary/95 text-white text-xs h-9 rounded-md cursor-pointer">
                    Edit Full Profile
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      );

    default:
      return null;
  }
}
