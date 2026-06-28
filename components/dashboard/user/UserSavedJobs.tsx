"use client"

import { getMyBookmarkedJobs, deleteBookmark as deleteBookmarkService } from '@/app/services/job/job.service'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Bookmark, MapPin, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { UserSavedJobsSkeleton } from './UserComponents'

function UserSavedJobs() {

  const [myJobs, setMyJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyJobs = async () => {
      setLoading(true)
      try {
        const res = await getMyBookmarkedJobs();
        setMyJobs(res?.data || res || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchMyJobs()
  }, [])

  const handleRemoveBookmark = async (jobId: string) => {
    try {
      await deleteBookmarkService(jobId);
      toast.success("Job removed from bookmark");
      setMyJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove bookmark");
    }
  }

  if (loading) {
    return <UserSavedJobsSkeleton/>
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Saved Jobs</h3>
        <span className="text-xs text-gray-400">{myJobs.length} {myJobs.length === 1 ? 'job' : 'jobs'} saved</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myJobs.map((job: any, index: number) => (
          <Card
            key={job.id}
            className="group bg-[#121211] border border-white/5 hover:border-primary/20 transition-all duration-300 p-5 relative overflow-hidden"
          >
            {/* Subtle gradient accent on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top section */}
            <div className="relative">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-white leading-tight truncate group-hover:text-primary/60 transition-colors duration-300">
                    {job.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1.5 ">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block transition-all group-hover:bg-primary" />
                    <span className='group-hover:text-primary/60 transition-all'>{job.recruiter?.companyName || job.company}</span>
                  </p>
                </div>
                <Button
                  onClick={() => handleRemoveBookmark(job.id)}
                  className="h-8 w-8 p-0 bg-transparent hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-lg border border-white/5 hover:border-red-500/20 cursor-pointer shrink-0 transition-all duration-200"
                  title="Remove from saved"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                </Button>
              </div>

              {/* Job details chips */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full text-[10px] font-medium text-gray-300 border border-white/5">
                  <MapPin size={11} className="text-gray-500" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full text-[10px] font-medium text-gray-300 border border-white/5">
                  <Briefcase size={11} className="text-gray-500" />
                  {job.jobType?.toLowerCase()}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full text-[10px] font-medium text-gray-300 border border-white/5">
                  <Calendar size={11} className="text-gray-500" />
                  {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Action button */}
            <div className="mt-5 pt-4 border-t border-white/5 relative">
              <Link href={`/job/${job.id}`} className="block w-full">
                <Button className="w-full bg-white/5 hover:bg-linear-to-r hover:from-primary/30 hover:to-primary/60 text-white text-xs h-9 rounded-lg cursor-pointer border border-white/5 hover:border-transparent transition-all duration-300 group/btn">
                  <span className="group-hover/btn:tracking-wider transition-all duration-300">View Details</span>
                </Button>
              </Link>
            </div>
          </Card>
        ))}

        {myJobs.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Bookmark className="w-7 h-7 text-gray-500" />
            </div>
            <p className="text-gray-400 text-sm font-medium">No saved jobs yet</p>
            <p className="text-gray-600 text-xs mt-1.5 max-w-xs">
              Browse through available job opportunities and save the ones that interest you!
            </p>
            <Link href="/jobs">
              <Button className="mt-5 bg-white/5 hover:bg-white/10 text-white text-xs h-9 rounded-lg cursor-pointer border border-white/5">
                Browse Jobs
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSavedJobs