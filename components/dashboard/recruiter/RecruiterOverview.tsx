import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle, ExternalLink, PlusCircle, Users } from 'lucide-react';
import React from 'react'

function RecruiterOverview({user, mockData}: {user: any, mockData: any}) {
    return (
        <div className="space-y-6">
            {/* Welcome Recruiter */}
            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-r from-primary/10 via-black to-black p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-black text-white">
                    Company Portal: <span className="text-primary">{user?.recruiter?.companyName || "Employer"}</span>
                </h2>
                <p className="text-gray-400 text-sm mt-1 max-w-xl">
                    Post new roles, manage applications, and shortlist talent for your open vacancies.
                </p>
            </div>

            {/* Recruiter Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-[#121211] border-white/5">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Posted Jobs</span>
                            <Briefcase className="text-primary w-4 h-4" />
                        </div>
                        <div className="mt-2.5">
                            <span className="text-2xl font-black text-white">{mockData.jobs.length}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#121211] border-white/5">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Active Listings</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </div>
                        <div className="mt-2.5">
                            <span className="text-2xl font-black text-white">
                                {mockData.jobs.filter((j: any) => j.status === "ACTIVE").length}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#121211] border-white/5">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Applicants</span>
                            <Users className="text-amber-400 w-4 h-4" />
                        </div>
                        <div className="mt-2.5">
                            <span className="text-2xl font-black text-white">{mockData.applicants.length}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#121211] border-white/5">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Shortlisted Candidates</span>
                            <CheckCircle className="text-green-400 w-4 h-4" />
                        </div>
                        <div className="mt-2.5">
                            <span className="text-2xl font-black text-white">
                                {mockData.applicants.filter((a: any) => a.status === "SHORTLISTED").length}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Applicants */}
                <Card className="bg-[#121211] border-white/5 lg:col-span-2">
                    <CardHeader className="border-b border-white/5 py-4">
                        <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Recent Applicants</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {mockData.applicants.slice(0, 3).map((a: any) => (
                                <div key={a.id} className="p-4 hover:bg-white/[0.01] transition-colors flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-semibold text-white">{a.name}</h4>
                                        <p className="text-xs text-gray-400 mt-0.5">Applied to: <span className="text-gray-300 font-medium">{a.jobTitle}</span></p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${a.status === "SHORTLISTED"
                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                            : a.status === "REJECTED"
                                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                            }`}>
                                            {a.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {mockData.applicants.length === 0 && (
                                <div className="p-8 text-center text-gray-500 text-xs">No active applications.</div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions Card */}
                <Card className="bg-[#121211] border-white/5">
                    <CardHeader className="border-b border-white/5 py-4">
                        <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                        <p className="text-xs text-gray-400 leading-relaxed mb-1">
                            Manage tasks or launch new recruitment pipelines instantly.
                        </p>
                        <Button className="w-full flex items-center justify-between text-xs py-5 bg-primary hover:bg-primary/90 rounded-xl font-bold cursor-pointer">
                            <span>Create Job Posting</span>
                            <PlusCircle size={15} />
                        </Button>
                        <Button className="w-full flex items-center justify-between text-xs py-5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/5 cursor-pointer">
                            <span>View Company Profile</span>
                            <ExternalLink size={14} />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default RecruiterOverview