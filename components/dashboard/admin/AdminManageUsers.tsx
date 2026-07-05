"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { allUsers, changeUserRole, changeUserStatus } from "@/app/services/admin/admin.service";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AdminLoadingSkeleton from "./AdminLoadingSkeleton";

const LIMIT = 5;

function AdminManageUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchUsers = async (currentPage: number) => {
        setLoading(true);
        setError(null);
        const result = await allUsers(LIMIT, currentPage);
        if (result.success) {
            setUsers(result.data.users);
            setPage(result.data.meta.page);
            setTotalPages(result.data.meta.totalPages);
            setTotal(result.data.meta.total);
        } else {
            setError(result.message || "Failed to fetch users");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(page);
    }, []);

    const goToPage = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        fetchUsers(newPage);
    };

    const handleChangeUserRole = async (email: string, role: string) => {
        const result = await changeUserRole(email, role);
        if (result.success) {
            setUsers(prev =>
                prev.map(u =>
                    u.email === email ? { ...u, role } : u
                )
            );
        }
    };

    const handleToggleUserBan = async (email: string, currentStatus: string) => {
        const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
        const result = await changeUserStatus(email, newStatus);
        if (result.success) {
            setUsers(prev =>
                prev.map(u =>
                    u.email === email ? { ...u, status: newStatus } : u
                )
            );
        }
    };

    if (loading) {
        return <AdminLoadingSkeleton/>;
    }

    if (error) {
        return (
            <Card className="bg-[#121211] border-white/5">
                <CardContent className="p-6">
                    <p className="text-red-400 text-sm">{error}</p>
                    <Button onClick={() => fetchUsers(1)} className="mt-2 h-8 text-xs">
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-[#121211] border-white/5">
            <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Platform Accounts</CardTitle>
                <span className="text-xs text-gray-400">{total} Users Enrolled</span>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/1">
                                <th className="p-4 font-semibold">User details</th>
                                <th className="p-4 font-semibold">Role</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {users.map((u: any) => (
                                <tr key={u.id} className="hover:bg-white/1 transition-colors">
                                    <td className="p-4">
                                        <div className="font-semibold text-white">{u.name}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">{u.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleChangeUserRole(u.email, e.target.value)}
                                            className="bg-[#181816] border border-white/10 rounded-md px-2 py-1 text-xs text-white outline-none focus:border-primary"
                                        >
                                            <option value="USER">USER</option>
                                            <option value="RECRUITER">RECRUITER</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${u.status === "ACTIVE"
                                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                : "bg-red-500/10 text-red-400 border-red-500/20"
                                            }`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button
                                            onClick={() => handleToggleUserBan(u.email, u.status)}
                                            className={`h-8 text-xs font-semibold px-3 rounded-md cursor-pointer border ${u.status === "ACTIVE"
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

export default AdminManageUsers;