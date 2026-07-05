"use client"

import { deleteJob, MyCreatedJobs, updateJobStatus } from '@/app/services/job/job.service';
import DeleteModel from '@/components/DeleteModel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Pause, Play, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

function RecruiterManageJobs() {
    const [jobList, setJobList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; jobId: string | null; jobTitle: string }>({
        isOpen: false,
        jobId: null,
        jobTitle: ''
    });

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            try {
                const data = await MyCreatedJobs(page, searchQuery);

                setJobList(data?.data?.jobs || []);
                setTotalPages(data?.data?.meta?.totalPages || 1);
                setPage(data?.data?.meta?.page || 1);
            } catch (error) {
                toast.error("Failed to fetch jobs!");
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, [refresh, page]);

    // Toggle Job Status
    const handleToggleJobStatus = async (jobId: string, status: string) => {
        try {
            await updateJobStatus(jobId, status);
            setRefresh(!refresh);
            toast.success("Job status updated!");
        } catch (error) {
            toast.error("Failed to update job status!");
        }
    };

    // Open Delete Confirmation Modal
    const openDeleteModal = (jobId: string, jobTitle: string) => {
        setDeleteModal({ isOpen: true, jobId, jobTitle });
    };

    // Close Delete Confirmation Modal
    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, jobId: null, jobTitle: '' });
    };

    // Confirm Delete Job
    const handleConfirmDelete = async () => {
        if (!deleteModal.jobId) return;

        try {
            await deleteJob(deleteModal.jobId);
            setRefresh(!refresh);
            toast.success("Job deleted successfully!");
            closeDeleteModal();
        } catch (error) {
            toast.error("Failed to delete job!");
        }
    };


    return (
        <>
            <div className="flex w-[24rem] gap-2 mb-5">
                <Input placeholder='Search job title' className='rounded-sm border-gray-500 w-[20rem]' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                {searchQuery.length > 0 && <div className='border border-gray-400 flex items-center h-8 w-9 cursor-pointer justify-center rounded-full' >
                    <X className='text-gray-500' onClick={() => { setSearchQuery(''); setRefresh(!refresh) }} size={20} /></div>}

                <Button className='rounded-sm cursor-pointer' disabled={searchQuery.length == 0 || isLoading} onClick={() => setRefresh(!refresh)}>Search</Button>
            </div>
            <Card className="bg-[#121211] border-white/5">
                <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">My Job Listings</CardTitle>
                    <div className='flex items-center justify-end gap-5'>
                        {isLoading ? <span className="text-sm text-gray-400">loading...</span> : <span className="text-sm text-gray-400">{jobList.length} Active Positions</span>}
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {/* {
                        isLoading ? <><Loader text='' /></> :
                            
                    } */}
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
                                {jobList?.map((job: any) => (
                                    <tr key={job.id} className="hover:bg-white/1 transition-colors">
                                        <td className="p-4">
                                            <div className="font-semibold text-white">{job.title}</div>
                                            <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                                <MapPin size={11} />
                                                {job.location}
                                            </div>
                                        </td>
                                        <td className="p-4 text-xs text-gray-300">{job.numberOfVacancies} Openings</td>
                                        <td className="p-4 text-xs text-gray-300">
                                            <span className="font-medium text-white">{job.applications.length}</span> candidates
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
                                                onClick={() => handleToggleJobStatus(job.id, job.status == "ACTIVE" ? "HOLD" : "ACTIVE")}
                                                className="h-8 w-8 p-0 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white rounded-md border border-white/10 cursor-pointer"
                                                title={job.status === "ACTIVE" ? "Pause job listing" : "Resume job listing"}
                                            >
                                                {job.status === "ACTIVE" ? <Pause size={13} /> : <Play size={13} />}
                                            </Button>
                                            <Button
                                                onClick={() => openDeleteModal(job.id, job.title)}
                                                className="h-8 w-8 p-0 bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-md border border-white/10 cursor-pointer"
                                                title="Delete job listing"
                                            >
                                                <Trash2 size={13} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {jobList?.length === 0 && (
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

            {totalPages > 0 && (
                <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="px-4 py-2 border border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1b1b1a] transition cursor-pointer"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-10 h-10 border cursor-pointer transition ${page === p ? "bg-white text-black border-white" : "border-gray-700 text-white hover:bg-[#1b1b1a]"}`}
                        >
                            {p}
                        </button>
                    ))}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-4 py-2 border border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1b1b1a] transition cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.isOpen && (
                <DeleteModel 
                deleteModal={deleteModal}
                closeDeleteModal={closeDeleteModal}
                handleConfirmDelete={handleConfirmDelete}
                />
            )}
        </>
    );
}

export default RecruiterManageJobs