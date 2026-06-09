import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle, ExternalLink, MapPin, Pause, Play, PlusCircle, Trash2, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';

function RecruiterManageJobs({ mockData, setMockData }: { mockData: any, setMockData: any }) {
    // Toggle Job Status
    const handleToggleJobStatus = (jobId: string) => {
        setMockData((prev: any) => ({
            ...prev,
            jobs: prev.jobs.map((job: any) =>
                job.id === jobId ? { ...job, status: job.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : job
            )
        }));
        toast.success("Job status updated!");
    };

    // Delete Job
    const handleDeleteJob = (jobId: string) => {
        setMockData((prev: any) => ({
            ...prev,
            jobs: prev.jobs.filter((job: any) => job.id !== jobId)
        }));
        toast.success("Job deleted successfully!");
    };

    return (
        <Card className="bg-[#121211] border-white/5">
            <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">My Job Listings</CardTitle>
                <span className="text-xs text-gray-400">{mockData.jobs.length} Active Positions</span>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/[0.01]">
                                <th className="p-4 font-semibold">Job Details</th>
                                <th className="p-4 font-semibold">Vacancies</th>
                                <th className="p-4 font-semibold">Applicants</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {mockData.jobs.map((job: any) => (
                                <tr key={job.id} className="hover:bg-white/[0.01] transition-colors">
                                    <td className="p-4">
                                        <div className="font-semibold text-white">{job.title}</div>
                                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                            <MapPin size={11} />
                                            {job.location}
                                        </div>
                                    </td>
                                    <td className="p-4 text-xs text-gray-300">{job.vacancies} Openings</td>
                                    <td className="p-4 text-xs text-gray-300">
                                        <span className="font-bold text-white">{job.applicantsCount}</span> candidates
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${job.status === "ACTIVE"
                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                            : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                                            }`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right flex justify-end gap-2">
                                        <Button
                                            onClick={() => handleToggleJobStatus(job.id)}
                                            className="h-8 w-8 p-0 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white rounded-md border border-white/10 cursor-pointer"
                                            title={job.status === "ACTIVE" ? "Pause job listing" : "Resume job listing"}
                                        >
                                            {job.status === "ACTIVE" ? <Pause size={13} /> : <Play size={13} />}
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteJob(job.id)}
                                            className="h-8 w-8 p-0 bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-md border border-white/10 cursor-pointer"
                                            title="Delete job listing"
                                        >
                                            <Trash2 size={13} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {mockData.jobs.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500 text-xs">
                                        No jobs listed. Start by posting your first role!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}

export default RecruiterManageJobs