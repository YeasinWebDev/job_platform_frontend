import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bookmark, CheckCircle, Clock, FileDown, FileText, TrendingUp } from 'lucide-react';
import { UserType } from '@/types/jobTypes';

function UserOverview({ user, mockData, getStatusBadgeColor, getStatusIcon }: { user: UserType, mockData: any, getStatusBadgeColor: (status: string) => string, getStatusIcon: (status: string) => React.ReactNode }) {
    
    return (
        <div className="space-y-6">
            {/* Welcome Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-linear-to-r from-primary/10 via-black to-black p-6 md:p-8">
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
                                <div key={app.id} className="p-4 hover:bg-white/1 transition-colors flex items-center justify-between">
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
}

export default UserOverview