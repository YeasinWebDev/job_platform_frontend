"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react'
import { myApplicationsList } from '@/app/services/job/job.service';
import { ApplicationStatus } from '@/types/jobTypes';
import UserJobDetailsModel from './UserJobDetailsModel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function UserAppliedJobs({ getStatusBadgeColor, getStatusIcon }: { getStatusBadgeColor: (status: string) => string, getStatusIcon: (status: string) => React.ReactNode }) {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [myApplications, setMyApplications] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await myApplicationsList(page, search, status)
        setMyApplications(response?.data?.result)
        setTotalPages(Number(response?.data?.meta?.totalPages))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData();
  }, [page, search, status])


  const statusLists = [
    "APPLIED",
    "SHORTLISTED",
    "REJECTED",
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-[#121211] border-white/5">
        <CardHeader className="border-b border-white/5 py-4 flex flex-col items-start justify-between">
          <div className="flex items-center gap-3 mb-4 justify-between w-full">
            <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Application History</CardTitle>
            <span className="text-xs text-gray-400">{
              isLoading ? "Loading..." : myApplications?.length + " Entries"
            }</span>
          </div>

          <div className='flex items-center gap-5'>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as ApplicationStatus | null)}
            >
              <SelectTrigger className="bg-[#121211] border border-white/10 text-white  px-3 py-2 rounded-sm outline-none">
                <SelectValue placeholder="Select a status" className="lowercase" />
              </SelectTrigger>
              <SelectContent
                className='rounded-none bg-transparent text-sm'
              >
                {statusLists.map((st) => (
                  <SelectItem key={st} value={st} className={`bg-[#121211] text-sm lowercase rounded-none text-white border-0 ${st === "APPLIED" ? "rounded-t-md" : st === "REJECTED" ? "rounded-b-md" : ""}`}>
                    {st}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button disabled={isLoading} className='rounded-sm cursor-pointer' onClick={() => { setStatus(null), setSearch("") }}>Clear</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/1">
                  <th className="p-4 font-semibold text-nowrap">Job Title & Company</th>
                  <th className="p-4 font-semibold text-nowrap">Date Applied</th>
                  <th className="p-4 font-semibold text-nowrap">Status</th>
                  <th className="p-4 font-semibold text-right text-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {
                  isLoading && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500 text-xs">
                        Loading...
                      </td>
                    </tr>
                  )
                }
                {!isLoading && myApplications.map((app: any) => (
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
                {!isLoading && myApplications.length === 0 && (
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
        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 border border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1b1b1a] transition cursor-pointer rounded-sm"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 border cursor-pointer transition rounded-sm ${page === p ? "bg-white text-black border-white" : "border-gray-700 text-white hover:bg-[#1b1b1a]"}`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 border border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1b1b1a] transition cursor-pointer rounded-sm"
            >
              Next
            </button>
          </div>
        )}
      </Card>

      {/* Details Modal */}
      {selectedApplication && (
        <UserJobDetailsModel
          getStatusBadgeColor={getStatusBadgeColor}
          getStatusIcon={getStatusIcon}
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
}

export default UserAppliedJobs