"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle, ExternalLink, PlusCircle, Users, Calendar, MapPin, Sparkles, TrendingUp, BarChart3, PieChart, Target } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { getRecruiterOverView } from '@/app/services/profile/profile.service';
import { RecruiterOverviewResponse } from '@/types/user.types';
import { useRouter } from 'next/navigation';

function RecruiterOverview({ user, setActiveTab }: { user: any, setActiveTab: React.Dispatch<React.SetStateAction<string>> }) {
    const [data, setData] = useState<RecruiterOverviewResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        const fetchRecruiterOverview = async () => {
            try {
                setLoading(true);
                const response = await getRecruiterOverView();
                if (response && response?.data) {
                    setData(response?.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecruiterOverview();
    }, [])

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                {/* Welcome skeleton */}
                <div className="rounded-2xl bg-[#121211] border border-white/5 p-6 md:p-8 h-28" />
                {/* Metrics skeleton */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="rounded-xl bg-[#121211] border border-white/5 p-6 h-24" />
                    ))}
                </div>
                {/* Bottom skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 rounded-xl bg-[#121211] border border-white/5 h-64" />
                    <div className="rounded-xl bg-[#121211] border border-white/5 h-64" />
                </div>
            </div>
        );
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "SHORTLISTED":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "REJECTED":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            default:
                return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        }
    };

    // Calculate percentages for application type breakdown
    const totalByType = (data?.applicationByType?.REMOTE ?? 0) + (data?.applicationByType?.ONSITE ?? 0);
    const remotePercent = totalByType > 0 ? Math.round(((data?.applicationByType?.REMOTE ?? 0) / totalByType) * 100) : 0;
    const onsitePercent = totalByType > 0 ? Math.round(((data?.applicationByType?.ONSITE ?? 0) / totalByType) * 100) : 0;

    // Calculate percentages for contract type breakdown
    const totalByContract = (data?.applicationByContract?.FULLTIME ?? 0) + (data?.applicationByContract?.PARTTIME ?? 0) + (data?.applicationByContract?.INTERNSHIP ?? 0);
    const fulltimePercent = totalByContract > 0 ? Math.round(((data?.applicationByContract?.FULLTIME ?? 0) / totalByContract) * 100) : 0;
    const parttimePercent = totalByContract > 0 ? Math.round(((data?.applicationByContract?.PARTTIME ?? 0) / totalByContract) * 100) : 0;
    const internshipPercent = totalByContract > 0 ? Math.round(((data?.applicationByContract?.INTERNSHIP ?? 0) / totalByContract) * 100) : 0;

    // Calculate conversion rate (shortlisted / total applications)
    const conversionRate = (data?.totalApplications ?? 0) > 0
        ? Math.round(((data?.totalShortlisted ?? 0) / (data?.totalApplications ?? 0)) * 100)
        : 0;


    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Welcome Recruiter */}
            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-linear-to-br from-primary/8 via-[#0f0f0f] to-[#0a0a0a] p-6 md:p-8">
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute top-4 right-4 opacity-5">
                    <Sparkles size={120} className="text-primary" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <div className="h-px flex-1 bg-linear-to-r from-primary/20 to-transparent" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-white">
                        Company Portal: <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">{user?.recruiter?.companyName || "Employer"}</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 max-w-xl leading-relaxed">
                        Post new roles, manage applications, and shortlist talent for your open vacancies.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/3 border border-white/5 px-3 py-1.5 rounded-full">
                            <Calendar size={12} />
                            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/3 border border-white/5 px-3 py-1.5 rounded-full">
                            <MapPin size={12} />
                            <span>{user?.recruiter?.location || "Location not set"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recruiter Metrics - Enhanced */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-[#121211] border-white/5 group hover:border-primary/20 transition-all duration-300">
                    <CardContent className="py-3">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Posted Jobs</span>
                            <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                <Briefcase className="text-blue-400 w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="text-2xl font-black text-white">{data?.totalJobsPosted ?? 0}</span>
                                <p className="text-[10px] text-gray-600 mt-0.5">All time listings</p>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                                <TrendingUp size={10} />
                                <span>Active</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#121211] border-white/5 group hover:border-green-500/20 transition-all duration-300">
                    <CardContent className="py-3">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Active Listings</span>
                            <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                                <Target className="text-green-400 w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="text-2xl font-black text-white">{data?.activeJobs ?? 0}</span>
                                <p className="text-[10px] text-gray-600 mt-0.5">Currently hiring</p>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span>Live</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#121211] border-white/5 group hover:border-amber-500/20 transition-all duration-300">
                    <CardContent className="py-3">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Applicants</span>
                            <div className="p-2 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                                <Users className="text-amber-400 w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="text-2xl font-black text-white">{data?.totalApplications ?? 0}</span>
                                <p className="text-[10px] text-gray-600 mt-0.5">Across all jobs</p>
                            </div>
                            {conversionRate > 0 && (
                                <div className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                                    <BarChart3 size={10} />
                                    <span>{conversionRate}% rate</span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#121211] border-white/5 group hover:border-green-500/20 transition-all duration-300">
                    <CardContent className="py-3">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Shortlisted</span>
                            <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                                <CheckCircle className="text-emerald-400 w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="text-2xl font-black text-white">{data?.totalShortlisted ?? 0}</span>
                                <p className="text-[10px] text-gray-600 mt-0.5">Top candidates</p>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                <CheckCircle size={10} />
                                <span>Qualified</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Application Breakdown & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Application Type Breakdown */}
                <Card className="bg-[#121211] border-white/5 h-[18rem]">
                    <CardHeader className="border-b border-white/5 py-4">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-md bg-purple-500/10">
                                <PieChart size={14} className="text-purple-400" />
                            </div>
                            <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Application Type</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                        {totalByType > 0 ? (
                            <div className='relative h-[20vw]'>
                                {/* Remote */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                                            <span className="text-xs text-gray-300 font-medium">Remote</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">{data?.applicationByType?.REMOTE ?? 0}</span>
                                            <span className="text-[10px] text-gray-600 w-8 text-right">{remotePercent}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-linear-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                                            style={{ width: `${remotePercent}%` }}
                                        />
                                    </div>
                                </div>
                                {/* Onsite */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                                            <span className="text-xs text-gray-300 font-medium">Onsite</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">{data?.applicationByType?.ONSITE ?? 0}</span>
                                            <span className="text-[10px] text-gray-600 w-8 text-right">{onsitePercent}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-linear-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                                            style={{ width: `${onsitePercent}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-white/5 absolute bottom-5">
                                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                                        <span>Total applications by type</span>
                                        <span className="font-medium text-gray-400">{totalByType}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="p-2.5 rounded-full bg-white/5 mb-2">
                                    <PieChart size={18} className="text-gray-500" />
                                </div>
                                <p className="text-xs text-gray-500">No data available</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Contract Type Breakdown */}
                <Card className="bg-[#121211] border-white/5 h-[18rem]">
                    <CardHeader className="border-b border-white/5 py-4">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-md bg-cyan-500/10">
                                <BarChart3 size={14} className="text-cyan-400" />
                            </div>
                            <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Contract Type</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                        {totalByContract > 0 ? (
                            <>
                                {/* Fulltime */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                            <span className="text-xs text-gray-300 font-medium">Full-time</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">{data?.applicationByContract?.FULLTIME ?? 0}</span>
                                            <span className="text-[10px] text-gray-600 w-8 text-right">{fulltimePercent}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                                            style={{ width: `${fulltimePercent}%` }}
                                        />
                                    </div>
                                </div>
                                {/* Parttime */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-violet-400" />
                                            <span className="text-xs text-gray-300 font-medium">Part-time</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">{data?.applicationByContract?.PARTTIME ?? 0}</span>
                                            <span className="text-[10px] text-gray-600 w-8 text-right">{parttimePercent}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-linear-to-r from-violet-500 to-violet-400 rounded-full transition-all duration-500"
                                            style={{ width: `${parttimePercent}%` }}
                                        />
                                    </div>
                                </div>
                                {/* Internship */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-rose-400" />
                                            <span className="text-xs text-gray-300 font-medium">Internship</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">{data?.applicationByContract?.INTERNSHIP ?? 0}</span>
                                            <span className="text-[10px] text-gray-600 w-8 text-right">{internshipPercent}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-linear-to-r from-rose-500 to-rose-400 rounded-full transition-all duration-500"
                                            style={{ width: `${internshipPercent}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-white/5">
                                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                                        <span>Total applications by contract</span>
                                        <span className="font-medium text-gray-400">{totalByContract}</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="p-2.5 rounded-full bg-white/5 mb-2">
                                    <BarChart3 size={18} className="text-gray-500" />
                                </div>
                                <p className="text-xs text-gray-500">No data available</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions Card */}
                <Card className="bg-[#121211] border-white/5 h-[18rem]">
                    <CardHeader className="border-b border-white/5 py-4">
                        <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                        <p className="text-xs text-gray-400 leading-relaxed mb-1">
                            Manage tasks or launch new recruitment pipelines instantly.
                        </p>
                        <Button onClick={() => {
                            localStorage.setItem("activeTab", JSON.stringify("post-job")),
                            setActiveTab("post-job")
                        }} className="w-full flex items-center justify-between text-xs py-5 bg-primary hover:bg-primary/90 rounded-md font-bold cursor-pointer">
                            <span>Create Job Posting</span>
                            <PlusCircle size={15} />
                        </Button>
                        <Button onClick={() => router.push('/profile')} className="w-full flex items-center justify-between text-xs py-5 bg-white/5 hover:bg-white/10 text-white rounded-md font-semibold border border-white/5 cursor-pointer">
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