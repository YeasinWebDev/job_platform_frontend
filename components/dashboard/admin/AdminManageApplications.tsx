"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { allApplications } from "@/app/services/admin/admin.service";
import { updateApplicationStatus } from "@/app/services/job/job.service";
import { useEffect, useState } from "react";

const LIMIT = 10;

const statusColors: Record<string, string> = {
    APPLIED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    SHORTLISTED: "bg-green-500/10 text-green-400 border-green-500/20",
    REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
};

function AdminManageApplications() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchApplications = async (currentPage: number) => {
        setLoading(true);
        setError(null);
        const result = await allApplications(LIMIT, currentPage);
        if (result.success) {
            setApplications(result.data.applications);
            setPage(result.data.meta.page);
            setTotalPages(result.data.meta.totalPages);
            setTotal(result.data.meta.total);
        } else {
            setError(result.message || "Failed to fetch applications");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchApplications(1);
    }, []);

    const goToPage = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        fetchApplications(newPage);
    };

    const handleStatusChange = async (applicationId: string, newStatus: string) => {
        const result = await updateApplicationStatus(applicationId, newStatus);
        if (result.success) {
            setApplications(prev =>
                prev.map(a =>
                    a.id === applicationId ? { ...a, status: newStatus } : a
                )
            );
        }
    };

    if (loading) {
        return (
            <Card className="bg-[#121211] border-white/5">
                <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
                    <div className="h-4 w-40 bg-white/10 rounded animate-pulse" />
                    <div className="h-3 w-28 bg-white/10 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/1">
                                    <th className="p-4 font-semibold">Applicant</th>
                                    <th className="p-4 font-semibold">Job</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {Array.from({ length: LIMIT }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="p-4">
                                            <div className="h-4 w-32 bg-white/10 rounded mb-2" />
                                            <div className="h-3 w-40 bg-white/10 rounded" />
                                        </td>
                                        <td className="p-4">
                                            <div className="h-4 w-36 bg-white/10 rounded" />
                                        </td>
                                        <td className="p-4">
                                            <div className="h-5 w-20 bg-white/10 rounded-full" />
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="h-8 w-24 bg-white/10 rounded-md ml-auto" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="bg-[#121211] border-white/5">
                <CardContent className="p-6">
                    <p className="text-red-400 text-sm">{error}</p>
                    <Button onClick={() => fetchApplications(1)} className="mt-2 h-8 text-xs">
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-[#121211] border-white/5">
            <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">All Applications</CardTitle>
                <span className="text-xs text-gray-400">{total} Total Applications</span>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/1">
                                <th className="p-4 font-semibold">Applicant</th>
                                <th className="p-4 font-semibold">Job</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {applications.map((app: any) => (
                                <tr key={app.id} className="hover:bg-white/1 transition-colors">
                                    <td className="p-4">
                                        <div className="font-semibold text-white">{app.user.name}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">{app.user.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-white">{app.job.title}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[app.status] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <select
                                            value={app.status}
                                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                            className="h-8 text-xs bg-[#181816] border border-white/10 rounded-md px-2 text-white outline-none focus:border-primary cursor-pointer"
                                            title="Update Status"
                                        >
                                            <option value="APPLIED">APPLIED</option>
                                            <option value="SHORTLISTED">SHORTLISTED</option>
                                            <option value="REJECTED">REJECTED</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {applications.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500 text-xs">
                                        No applications submitted yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
                        <span className="text-xs text-gray-400">
                            Page {page} of {totalPages}
                        </span>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => goToPage(page - 1)}
                                disabled={page <= 1}
                                className="h-8 w-8 p-0 flex items-center justify-center rounded-md border border-white/10 bg-[#181816] text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <Button
                                    key={p}
                                    onClick={() => goToPage(p)}
                                    className={`h-8 w-8 p-0 text-xs font-semibold rounded-md cursor-pointer ${p === page
                                            ? "bg-primary text-white"
                                            : "border border-white/10 bg-[#181816] text-white hover:bg-white/10"
                                        }`}
                                >
                                    {p}
                                </Button>
                            ))}

                            <Button
                                onClick={() => goToPage(page + 1)}
                                disabled={page >= totalPages}
                                className="h-8 w-8 p-0 flex items-center justify-center rounded-md border border-white/10 bg-[#181816] text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default AdminManageApplications;