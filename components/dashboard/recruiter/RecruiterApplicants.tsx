import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getRecruiterApplications, updateApplicationStatus } from '@/app/services/job/job.service';
import { Input } from '@/components/ui/input';

function RecruiterApplicants() {
    const [applications, setApplications] = useState<any[]>([]);
    const [meta, setMeta] = useState<any>({ total: 0, page: 1, limit: 10, totalPages: 0 });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const res = await getRecruiterApplications(page, search);
            if (res?.success) {
                setApplications(res.data.applications || []);
                setMeta(res.data.meta);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [page]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchApplications();
    };

    const handleApplicantStatus = async (applicantId: string, status: "SHORTLISTED" | "REJECTED") => {
        // Optimistic update
        setApplications((prev) =>
            prev.map((a: any) =>
                a.id === applicantId ? { ...a, status } : a
            )
        );

        try {
            const res = await updateApplicationStatus(applicantId, status);
            if (res?.success) {
                toast.success(`Candidate status updated to ${status.toLowerCase()}!`);
            } else {
                // Revert on failure
                setApplications((prev) =>
                    prev.map((a: any) =>
                        a.id === applicantId ? { ...a, status: "APPLIED" } : a
                    )
                );
                toast.error(res?.message || "Failed to update status");
            }
        } catch (error) {
            // Revert on error
            setApplications((prev) =>
                prev.map((a: any) =>
                    a.id === applicantId ? { ...a, status: "APPLIED" } : a
                )
            );
            toast.error("Something went wrong");
        }
    };

    const getUserName = (application: any) => application.user?.name || "Unknown";
    const getUserEmail = (application: any) => application.user?.email || "";
    const getJobTitle = (application: any) => application.job?.title || "Unknown Position";
    const getDateApplied = (application: any) => application.createdAt || "";
    const getStatus = (application: any) => application.status || "APPLIED";

    return (
        <Card className="bg-[#121211] border-white/5">
            <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Candidate Applications</CardTitle>
                <span className="text-xs text-gray-400">{meta.total} Total Applicants</span>
            </CardHeader>
            <CardContent className="p-0">
                {/* Search Bar */}
                <div className="p-4 border-b border-white/5">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by job title..."
                                className="pl-10 bg-white/3 border-white/10 text-white text-xs h-9"
                            />
                        </div>
                        <Button type="submit" className="h-9 text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 cursor-pointer">
                            Search
                        </Button>
                    </form>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500 text-xs">Loading applications...</div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/1">
                                        <th className="p-4 font-semibold">Candidate</th>
                                        <th className="p-4 font-semibold">Applied Role</th>
                                        <th className="p-4 font-semibold">Date Applied</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {applications.map((a: any) => (
                                        <tr key={a.id} className="hover:bg-white/1 transition-colors">
                                            <td className="p-4">
                                                <div className="font-semibold text-white">{getUserName(a)}</div>
                                                <div className="text-xs text-gray-400 mt-0.5">{getUserEmail(a)}</div>
                                            </td>
                                            <td className="p-4 text-xs text-gray-300 font-medium">{getJobTitle(a)}</td>
                                            <td className="p-4 text-xs text-gray-300">
                                                {new Date(getDateApplied(a)).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatus(a) === "SHORTLISTED"
                                                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                    : getStatus(a) === "REJECTED"
                                                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                    }`}>
                                                    {getStatus(a)}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right flex justify-end items-center gap-2">
                                                {a.user?.userInfo?.resume && (
                                                    <a
                                                        href={a.user.userInfo.resume}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mr-2"
                                                    >
                                                        Resume <ExternalLink size={10} />
                                                    </a>
                                                )}
                                                {getStatus(a) === "APPLIED" && (
                                                    <>
                                                        <Button
                                                            onClick={() => handleApplicantStatus(a.id, "SHORTLISTED")}
                                                            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 text-[10px] font-bold h-7 px-2.5 rounded-md border border-green-500/20 cursor-pointer"
                                                        >
                                                            Shortlist
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleApplicantStatus(a.id, "REJECTED")}
                                                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold h-7 px-2.5 rounded-md border border-red-500/20 cursor-pointer"
                                                        >
                                                            Reject
                                                        </Button>
                                                    </>
                                                )}
                                                {getStatus(a) !== "APPLIED" && (
                                                    <span className="text-xs text-gray-500 italic">No actions</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {applications.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-gray-500 text-xs">
                                                No candidates have applied to your listings yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {meta.totalPages > 1 && (
                            <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
                                <span className="text-xs text-gray-500">
                                    Page {meta.page} of {meta.totalPages}
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={meta.page <= 1}
                                        className="h-8 text-xs bg-white/3 border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                                    >
                                        <ChevronLeft size={14} />
                                    </Button>
                                    <Button
                                        onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                                        disabled={meta.page >= meta.totalPages}
                                        className="h-8 text-xs bg-white/3 border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                                    >
                                        <ChevronRight size={14} />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}

export default RecruiterApplicants