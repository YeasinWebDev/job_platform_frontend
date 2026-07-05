"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Briefcase, Users, Briefcase as JobIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { allUsers, getJobStatusBreakdown, getTopRecruiters, getTotalRevenue } from "@/app/services/admin/admin.service";
import { AdminOverviewLoader } from "./AdminLoadingSkeleton";

function AdminOverview() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalJobs: 0,
        totalRevenue: 0,
    });
    const [topRecruiters, setTopRecruiters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const [usersResult, breakdownResult, recruitersResult, revenueResult] = await Promise.all([
                allUsers(1, 1),
                getJobStatusBreakdown(),
                getTopRecruiters(3),
                getTotalRevenue(),
            ]);

            if (usersResult.success) {
                setStats(prev => ({ ...prev, totalUsers: usersResult.data.meta.total }));
            }

            if (breakdownResult.success) {
                setStats(prev => ({
                    ...prev,
                    totalJobs: breakdownResult.data.total,
                }));
            }

            if (revenueResult.success) {
                setStats(prev => ({
                    ...prev,
                    totalRevenue: revenueResult.data.totalRevenue || 0,
                }));
            }

            if (recruitersResult.success) {
                setTopRecruiters(recruitersResult.data);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <AdminOverviewLoader/>
    }

    return (
        <div className="space-y-6">
            {/* Admin Welcome */}
            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-linear-to-r from-red-500/10 via-black to-black p-6 md:p-8">
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
                    <CardContent className="py-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Platform Users</span>
                            <Users className="text-red-400 w-4 h-4" />
                        </div>
                        <div className="mt-2.5">
                            <span className="text-2xl font-black text-white">{stats.totalUsers}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#121211] border-white/5">
                    <CardContent className="py-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Recruiters</span>
                            <Activity className="text-amber-400 w-4 h-4" />
                        </div>
                        <div className="mt-2.5">
                            <span className="text-2xl font-black text-white">{topRecruiters.length}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#121211] border-white/5">
                    <CardContent className="py-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Platform Jobs</span>
                            <Briefcase className="text-blue-400 w-4 h-4" />
                        </div>
                        <div className="mt-2.5">
                            <span className="text-2xl font-black text-white">{stats.totalJobs}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#121211] border-white/5">
                    <CardContent className="py-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Revenue</span>
                            <svg className="text-green-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="mt-2.5">
                            <span className="text-2xl font-black text-white">${stats.totalRevenue.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Recruiters */}
                <Card className="bg-[#121211] border-white/5 lg:col-span-2">
                    <CardHeader className="border-b border-white/5 py-4">
                        <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Top Recruiters</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {topRecruiters.map((recruiter: any, index: number) => (
                                <div key={recruiter.id} className="flex items-center justify-between px-4 py-3 hover:bg-white/1 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400 shrink-0">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">
                                                {recruiter.companyName || recruiter.name}
                                            </div>
                                            <div className="text-xs text-gray-400">{recruiter.email}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <JobIcon className="w-3.5 h-3.5 text-blue-400" />
                                        <span className="text-sm font-bold text-white">{recruiter.totalJobs}</span>
                                    </div>
                                </div>
                            ))}
                            {topRecruiters.length === 0 && (
                                <div className="p-8 text-center text-gray-500 text-xs">
                                    No recruiters found on the platform.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* System Status */}
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
}

export default AdminOverview;