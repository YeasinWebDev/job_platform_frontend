"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { myApplicationsList } from '@/app/services/job/job.service';
import { ApplicationStatus } from '@/types/jobTypes';

function UserAppliedJobs({ mockData, getStatusBadgeColor, getStatusIcon }: any) {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [myApplications, setMyApplications] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0)



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myApplicationsList(page, search, status)
        setMyApplications(response?.data?.result)
        setTotalPages(Number(response?.data?.meta?.totalPages))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [page, search, status])

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
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/1">
                  <th className="p-4 font-semibold">Job Title & Company</th>
                  <th className="p-4 font-semibold">Date Applied</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {myApplications.map((app: any) => (
                  <tr key={app.id} className="hover:bg-white/1 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-white">{app.job.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{app.job.recruiter.companyName}</div>
                    </td>
                    <td className="p-4 text-xs text-gray-300">
                      {new Date(app.createdAt).toLocaleDateString()}
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
                {myApplications.length === 0 && (
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
        {totalPages > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="bg-transparent border-white/10 text-white hover:bg-white/5"
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Button
                    key={pageNumber}
                    size="sm"
                    onClick={() => setPage(pageNumber)}
                    className={
                      page === pageNumber
                        ? "bg-primary text-white"
                        : "bg-transparent border border-white/10 text-white hover:bg-white/5"
                    }
                  >
                    {pageNumber}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-transparent border-white/10 text-white hover:bg-white/5"
            >
              Next
            </Button>
          </div>
        )}
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
                    className={`h-full rounded-full ${selectedApplication.status === "SHORTLISTED"
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
}

export default UserAppliedJobs