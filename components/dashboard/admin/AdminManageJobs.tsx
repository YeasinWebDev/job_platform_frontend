"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Eye, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { allJobs, updateJobStatus, deleteJob } from "@/app/services/admin/admin.service";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteModel from "@/components/DeleteModel";
import toast from "react-hot-toast";

const LIMIT = 5;

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-500/10 text-green-400 border-green-500/20",
  PENDING_PAYMENT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  HOLD: "bg-red-500/10 text-red-400 border-red-500/20",
  EXPIRED: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

function AdminManageJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchJobs = async (currentPage: number) => {
    setLoading(true);
    setError(null);
    const result = await allJobs(LIMIT, currentPage);
    if (result.success) {
      setJobs(result.data.jobs);
      setPage(result.data.meta.page);
      setTotalPages(result.data.meta.totalPages);
      setTotal(result.data.meta.total);
    } else {
      setError(result.message || "Failed to fetch jobs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    fetchJobs(newPage);
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    const result = await updateJobStatus(jobId, newStatus);
    toast.success("Status changed successfully")
    if (result.success) {
      setJobs(prev =>
        prev.map(j =>
          j.id === jobId ? { ...j, status: newStatus } : j
        )
      );
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const result = await deleteJob(deleteTarget.id);
    toast.success("Job deleted successfully")
    if (result.success) {
      setJobs(prev => prev.filter(j => j.id !== deleteTarget.id));
      setTotal(prev => prev - 1);
    }
    setDeleting(false);
    setDeleteTarget(null);
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
                  <th className="p-4 font-semibold">Job Title</th>
                  <th className="p-4 font-semibold">Company Name</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {Array.from({ length: LIMIT }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-4">
                      <div className="h-4 w-40 bg-white/10 rounded" />
                    </td>
                    <td className="p-4">
                      <div className="h-4 w-36 bg-white/10 rounded" />
                    </td>
                    <td className="p-4">
                      <div className="h-5 w-20 bg-white/10 rounded-full" />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <div className="h-8 w-8 bg-white/10 rounded-md" />
                        <div className="h-8 w-20 bg-white/10 rounded-md" />
                        <div className="h-8 w-8 bg-white/10 rounded-md" />
                      </div>
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
          <Button onClick={() => fetchJobs(1)} className="mt-2 h-8 text-xs">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-[#121211] border-white/5">
        <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">All Job Postings</CardTitle>
          <span className="text-xs text-gray-400">{total} Total Listings</span>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/1">
                  <th className="p-4 font-semibold">Job Title</th>
                  <th className="p-4 font-semibold">Company Name</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {jobs.map((job: any) => (
                  <tr key={job.id} className="hover:bg-white/1 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-white">{job.title}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-white">
                        {job.recruiter?.companyName || job.recruiter?.user?.name || "Unknown"}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[job.status] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                        {job.status === "PENDING_PAYMENT" ? "PENDING" : job.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/job/${job.id}`}
                          className="h-8 w-8 inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-gray-400 hover:text-white rounded-md border border-white/10 transition-colors"
                          title="View Job"
                        >
                          <Eye size={13} />
                        </Link>

                        <select
                          value={job.status}
                          onChange={(e) => handleStatusChange(job.id, e.target.value)}
                          className="h-8 text-xs bg-[#181816] border border-white/10 rounded-md px-2 text-white outline-none focus:border-primary cursor-pointer"
                          title="Update Status"
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="HOLD">HOLD</option>
                          <option value="PENDING_PAYMENT">PENDING</option>
                          <option value="EXPIRED">EXPIRED</option>
                        </select>

                        <Dialog>
                          <DialogTrigger
                            onClick={() => setDeleteTarget(job)}
                            className="h-8 w-8 inline-flex items-center justify-center bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-md border border-white/10 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </DialogTrigger>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500 text-xs">
                      No jobs listed on the platform.
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

          {/* Delete Confirmation Modal */}
          {deleteTarget && (
            <DeleteModel
              deleteModal={{ isOpen: true, jobTitle: deleteTarget.title, jobId: deleteTarget.id }}
              closeDeleteModal={() => setDeleteTarget(null)}
              handleConfirmDelete={handleConfirmDelete}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default AdminManageJobs;