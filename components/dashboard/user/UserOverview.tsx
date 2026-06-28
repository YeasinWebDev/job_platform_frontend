"use client"

import React, { useEffect, useState } from 'react'
import { Bookmark, CheckCircle, FileDown, FileText, Briefcase, Target, MapPin, Calendar, Sparkles, ChevronRight, Download, Mail, Phone, Globe, User } from 'lucide-react';
import { UserType } from '@/types/jobTypes';
import { getUserOverView } from '@/app/services/profile/profile.service';
import { UserOverviewResponse } from '@/types/user.types';
import { LoadingSkeleton, StatCard, StatusBadge } from './UserComponents';

function UserOverview({ user, getStatusBadgeColor, getStatusIcon }: { user: UserType, getStatusBadgeColor: (status: string) => string, getStatusIcon: (status: string) => React.ReactNode }) {

    const [data, setData] = useState<UserOverviewResponse | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserOverview = async () => {
            try {
                setLoading(true);
                const response = await getUserOverView();
                if (response && response?.data) {
                    setData(response?.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserOverview();
    }, [])

    // --- LOADING STATE ---
    if (loading) {
        return <LoadingSkeleton />
    }

    // --- ACTUAL CONTENT ---
    const profileStrength = 85;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* ========== WELCOME SECTION ========== */}
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
                            <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="h-px flex-1 bg-linear-to-r from-primary/20 to-transparent" />
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                        Welcome back, <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">{user?.name || "Job Seeker"}</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-2 max-w-xl leading-relaxed">
                        Track your active job applications, review invitations, and manage your professional profile from one central dashboard.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/3 border border-white/5 px-3 py-1.5 rounded-full">
                            <Calendar size={12} />
                            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/3 border border-white/5 px-3 py-1.5 rounded-full">
                            <MapPin size={12} />
                            <span>{user?.userInfo?.location || "Location not set"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========== QUICK METRICS ========== */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                <StatCard
                    icon={<FileText size={16} />}
                    iconBg="bg-primary/10"
                    iconColor="text-primary"
                    label="Total Applications"
                    value={data?.totalJobsApplied ?? 0}
                    trend={data?.totalJobsApplied && data.totalJobsApplied > 0 ? 1 : undefined}
                />
                <StatCard
                    icon={<CheckCircle size={16} />}
                    iconBg="bg-green-500/10"
                    iconColor="text-green-400"
                    label="Shortlisted"
                    value={data?.totalShortlisted ?? 0}
                />
                <StatCard
                    icon={<Bookmark size={16} />}
                    iconBg="bg-amber-500/10"
                    iconColor="text-amber-400"
                    label="Saved Jobs"
                    value={data?.totalJobsSaved ?? 0}
                />
                <StatCard
                    icon={<Target size={16} />}
                    iconBg="bg-purple-500/10"
                    iconColor="text-purple-400"
                    label="Profile Strength"
                    value={profileStrength}
                    progress={profileStrength}
                    progressColor="bg-gradient-to-r from-primary to-purple-500"
                />
            </div>

            {/* ========== BOTTOM GRID ========== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* ===== Recent Applications ===== */}
                <div className="lg:col-span-2">
                    <div className="relative group h-full">
                        <div className="relative rounded-xl border border-white/5 bg-linear-to-br from-[#1a1a1a] to-[#121212] overflow-hidden h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-1.5 rounded-md bg-primary/10">
                                        <Briefcase size={14} className="text-primary" />
                                    </div>
                                    <h3 className="text-sm font-semibold text-white">Recent Applications</h3>
                                </div>
                                {data?.recentApplications && data.recentApplications.length > 0 && (
                                    <button className="text-[11px] font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                                        View all
                                        <ChevronRight size={12} />
                                    </button>
                                )}
                            </div>

                            {/* List */}
                            <div className="divide-y divide-white/5">
                                {data?.recentApplications?.slice(0, 3).map((app, index) => (
                                    <div
                                        key={app.id}
                                        className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors group/item"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {/* Company avatar */}
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-white/5 to-white/2 border border-white/5 flex items-center justify-center overflow-hidden">
                                            {app.job?.recruiter?.companyImage ? (
                                                <img
                                                    src={app.job.recruiter.companyImage}
                                                    alt={app.job.recruiter.companyName}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Briefcase size={16} className="text-gray-500" />
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-white truncate group-hover/item:text-primary transition-colors">
                                                {app.job?.title || "Unknown Position"}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-0.5 truncate">
                                                {app.job?.recruiter?.companyName || "Unknown Company"}
                                            </p>
                                        </div>

                                        {/* Meta */}
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-[10px] text-gray-600 hidden sm:block whitespace-nowrap">
                                                {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                            <StatusBadge
                                                status={app.status}
                                                getStatusBadgeColor={getStatusBadgeColor}
                                                getStatusIcon={getStatusIcon}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {(!data?.recentApplications || data.recentApplications.length === 0) && (
                                    <div className="flex flex-col items-center justify-center py-12 px-5">
                                        <div className="p-3 rounded-full bg-white/5 mb-3">
                                            <Briefcase size={20} className="text-gray-500" />
                                        </div>
                                        <p className="text-sm text-gray-500">No active applications yet</p>
                                        <p className="text-xs text-gray-600 mt-1">Start applying to job listings!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== Profile Quick Links ===== */}
                <div>
                    <div className="relative group h-full">
                        <div className="relative rounded-xl border border-white/5 bg-linear-to-br from-[#1a1a1a] to-[#121212] overflow-hidden h-full">
                            {/* Header */}
                            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/5">
                                <div className="p-1.5 rounded-md bg-purple-500/10">
                                    <User size={14} className="text-purple-400" />
                                </div>
                                <h3 className="text-sm font-semibold text-white">Quick Links</h3>
                            </div>

                            <div className="p-5 space-y-5">
                                {/* Resume status */}
                                <div>
                                    <div className="flex items-center justify-between mb-2.5">
                                        <span className="text-xs font-medium text-gray-500">Resume</span>
                                        <span className="text-xs font-semibold text-green-400 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            {user?.userInfo?.resume ? "Uploaded" : "Missing"}
                                        </span>
                                    </div>
                                    {user?.userInfo?.resume ? (
                                        <a
                                            href={user.userInfo.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/5 transition-all hover:border-primary/30 group/btn"
                                        >
                                            <Download size={14} className="group-hover/btn:text-primary transition-colors" />
                                            <span>Download Resume</span>
                                        </a>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/2 text-gray-600 text-xs font-semibold border border-dashed border-white/5 cursor-not-allowed">
                                            <FileDown size={14} />
                                            <span>No resume uploaded</span>
                                        </div>
                                    )}
                                </div>

                                {/* Divider */}
                                <div className="border-t border-white/5" />

                                {/* Contact info */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Contact</p>
                                    <div className="space-y-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-1.5 rounded-md bg-white/5">
                                                <Mail size={12} className="text-gray-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] text-gray-600">Email</p>
                                                <p className="text-xs text-gray-300 truncate">{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-1.5 rounded-md bg-white/5">
                                                <Phone size={12} className="text-gray-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] text-gray-600">Phone</p>
                                                <p className="text-xs text-gray-300 truncate">{user?.userInfo?.phone || "Not set"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-1.5 rounded-md bg-white/5">
                                                <Globe size={12} className="text-gray-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] text-gray-600">Location</p>
                                                <p className="text-xs text-gray-300 truncate">{user?.userInfo?.location || "Not set"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom gradient */}
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#121212] to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserOverview