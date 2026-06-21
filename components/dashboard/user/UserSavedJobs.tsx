"use client"

import { getMyBookmarkedJobs, deleteBookmark as deleteBookmarkService } from '@/app/services/job/job.service'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Bookmark, MapPin, Briefcase, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

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
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myJobs.map((job: any) => (
          <Card key={job.id} className="bg-[#121211] border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between p-5">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-white leading-tight">{job.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{job.recruiter?.companyName || job.company}</p>
                </div>
                <Button
                  onClick={() => handleRemoveBookmark(job.id)}
                  className="h-7 w-7 p-0 bg-transparent hover:bg-red-500/10 text-primary hover:text-red-400 rounded-md border border-white/5 cursor-pointer"
                  title="Remove from saved"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-2">
                <span className="flex items-center gap-1 text-[11px]">
                  <MapPin size={12} />
                  {job.location}
                </span>
                <span className="text-white/10">•</span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Briefcase size={12} />
                  {job.jobType?.toLowerCase()}
                </span>
                <span className="text-white/10">•</span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar size={12} />
                  Posted {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 mt-5 pt-4 border-t border-white/5">
              <Link href={`/job/${job.id}`} className="flex-1">
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white text-xs h-9 rounded-md cursor-pointer border border-white/5">
                  View Details
                </Button>
              </Link>
            </div>
          </Card>
        ))}

        {myJobs.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500 text-sm">
            No saved jobs. Browse job opportunities to add them here!
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSavedJobs