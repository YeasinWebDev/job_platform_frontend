"use client";

import { useEffect, useState } from "react";
import { MapPin, Briefcase, Users, Clock } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Award } from "lucide-react";
import { Job, UserType } from "@/types/jobTypes";
import { Button } from "../ui/button";
import Link from "next/link";
import { getJobById } from "@/app/services/job/job.service";
import Loader from "../Loader";
import toast from "react-hot-toast";

export default function JobDetailsPage({ id = "1", user }: { id: string; user: UserType }) {
  const [job, setJob] = useState<Job>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const data = await getJobById(id);
        setJob(data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (job?.success === false && !loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white px-6 pt-32 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#161616] border border-gray-800 rounded-md p-6 mb-6 flex items-center justify-center">
            <div className="flex items-center justify-between flex-col  gap-5">
              <div className="w-full">
                <h1 className="text-2xl font-bold mb-2">Job not found</h1>
              </div>
              <Button className="h-10 rounded-md cursor-pointer" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatSalary = (min: string, max: string) => {
    return `$${Number(min) / 1000}k - $${Number(max) / 1000}k`;
  };

  const handleApply = async () => {
    // @ts-ignore
    if(user.error){
      toast.error("Please Login to Apply")
    }
    try {
      // await applyForJob(id);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(user,"user")

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 pt-32 pb-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-[#161616] border border-gray-800 rounded-md p-6 mb-6">
          <div className="flex items-start justify-between flex-col md:flex-row gap-5">
            <div className="w-full">
              <h1 className="text-2xl font-bold mb-2">{job?.title}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-gray-400 w-full">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {job?.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={14} /> {job?.jobType?.toLowerCase()}
                </span>
                <span className="flex items-center gap-1">
                  <Award size={14} /> {job?.experienceLevel}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} /> {job?.numberOfVacancies}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {job?.contract}
                </span>
              </div>
            </div>

            <div className="text-right flex items-end flex-col justify-end w-full">
              <p className="text-xl font-semibold">{formatSalary(job?.minSalary!, job?.maxSalary!)}</p>
              <p className="text-xs text-gray-400">Salary / year</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left content */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-[#161616] border border-gray-800 rounded-md p-6">
              <h2 className="text-lg font-semibold mb-3">Job Description</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                {job?.description?.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-[#161616] border border-gray-800 rounded-md p-6">
              <h2 className="text-lg font-semibold mb-3">Requirements</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                {job?.other_requirements?.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="bg-[#161616] border border-gray-800 rounded-md p-6">
              <h2 className="text-lg font-semibold mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job?.skills?.map((skill, i) => (
                  <span key={i} className="px-3 py-1 text-xs bg-gray-800 rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-[#161616] border border-gray-800 rounded-md p-6">
              <h2 className="text-lg font-semibold mb-3">Benefits</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                {job?.benefits?.split(",").map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            {/* Company */}
            <div className="bg-[#161616] border border-gray-800 rounded-md p-5 text-center">
              {job?.recruiter?.companyImage ? (
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-3">
                  <img src={job?.recruiter?.companyImage || ""}/>
                </div>
              ) : (
                <h2 className="text-3xl font-bold mb-3 bg-black w-16 h-16 mx-auto rounded-full flex items-center justify-center">{job?.recruiter?.companyName?.slice(0, 1)}</h2>
              )}

              <h3 className="font-semibold">{job?.recruiter?.companyName}</h3>
              <p className="text-xs text-gray-400">{job?.recruiter?.location}</p>
              <Link target="_blank" href={job?.recruiter?.website || "#"} className="text-xs text-blue-400 underline">
                Visit Website
              </Link>
            </div>

            {/* Job Info */}
            <div className="bg-[#161616] border border-gray-800 rounded-md p-5 space-y-3 text-sm">
              <p>
                <strong>Vacancies:</strong> {job?.numberOfVacancies}
              </p>
              <p>
                <strong>Duration:</strong> {job?.Duration}
              </p>
              <p>
                <strong>Start Date:</strong> {new Date(job?.startDate || "").toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Expiry:</strong> {new Date(job?.expiresAt || "").toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Posted:</strong> {new Date(job?.createdAt || "").toLocaleDateString("en-GB")}
              </p>
            </div>

            {/* Apply Button */}
            <button onClick={handleApply} className="w-full bg-white text-black py-3 rounded-md-xl font-semibold hover:bg-gray-200 transition rounded-md cursor-pointer">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : "Apply Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
