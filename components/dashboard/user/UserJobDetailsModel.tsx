"use client"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
interface UserJobDetailsModelProps {
  application: any;
  getStatusBadgeColor: any;
  getStatusIcon: any;
  onClose: () => void;
}

export default function UserJobDetailsModel({ application, getStatusBadgeColor, getStatusIcon, onClose }: UserJobDetailsModelProps) {
  const router = useRouter()
  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg rounded-xl bg-[#121211] border border-white/10 p-6 space-y-5 shadow-2xl relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                  Application Details
                </span>

                <h3 className="text-lg font-black text-white mt-1">
                  {application.job.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {application.job.recruiter.companyName}
                </p>
              </div>

              <span
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadgeColor(
                  application.status
                )}`}
              >
                {getStatusIcon(application.status)}
                {application.status}
              </span>
            </div>

            <div className="space-y-3 text-xs text-gray-300 border-t border-b border-white/5 py-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Date Applied:</span>
                <span>
                  {new Date(application.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Job Type:</span>
                <span>
                  {application.job.contract} (
                  {application.job.jobType})
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Location:</span>
                <span>{application.job.location}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Experience:</span>
                <span>{application.job.experienceLevel}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Salary:</span>
                <span>
                  ৳{application.job.minSalary} - ৳
                  {application.job.maxSalary}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 pt-2">
                <span className="text-gray-500">Application Progress:</span>

                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full rounded-full ${application.status === "SHORTLISTED"
                        ? "bg-green-400 w-full"
                        : application.status === "REJECTED"
                          ? "bg-red-400 w-1/3"
                          : "bg-amber-400 w-2/3"
                      }`}
                  />
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">
                Job Description
              </h4>

              <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                {application.job.description?.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">
                Required Skills
              </h4>

              <div className="flex flex-wrap gap-2">
                {application.job.skills?.map(
                  (skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded bg-white/5 border border-white/10 text-gray-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button
                onClick={onClose}
                className="bg-white/5 hover:bg-white/10 text-white rounded-md h-9 text-xs font-semibold cursor-pointer border border-white/5"
              >
                Close
              </Button>

              <Button onClick={() => router.push(`/job/${application.job.id}`)} className="bg-primary hover:bg-primary/90 text-white rounded-md h-9 text-xs font-semibold cursor-pointer">
                View Job
              </Button>
            </div>
          </motion.div>
        </div>
  );
}