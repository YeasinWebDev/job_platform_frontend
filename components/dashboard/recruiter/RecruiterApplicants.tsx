import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

function RecruiterApplicants({ mockData, setMockData }: { mockData: any, setMockData: React.Dispatch<React.SetStateAction<any>> }) {
    const handleApplicantStatus = (applicantId: string, status: "SHORTLISTED" | "REJECTED") => {
        setMockData((prev: any) => ({
            ...prev,
            applicants: prev.applicants.map((a: any) =>
                a.id === applicantId ? { ...a, status } : a
            ),
            // Update applications state in user's side
            applications: prev.applications.map((a: any) =>
                a.id === applicantId ? { ...a, status } : a
            )
        }));
        toast.success(`Candidate status updated to ${status}!`);
    };
    return (
        <Card className="bg-[#121211] border-white/5">
            <CardHeader className="border-b border-white/5 py-4 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">Candidate Applications</CardTitle>
                <span className="text-xs text-gray-400">{mockData.applicants.length} Total Applicants</span>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-gray-400 bg-white/[0.01]">
                                <th className="p-4 font-semibold">Candidate</th>
                                <th className="p-4 font-semibold">Applied Role</th>
                                <th className="p-4 font-semibold">Date Applied</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {mockData.applicants.map((a: any) => (
                                <tr key={a.id} className="hover:bg-white/[0.01] transition-colors">
                                    <td className="p-4">
                                        <div className="font-semibold text-white">{a.name}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">{a.email}</div>
                                    </td>
                                    <td className="p-4 text-xs text-gray-300 font-medium">{a.jobTitle}</td>
                                    <td className="p-4 text-xs text-gray-300">
                                        {new Date(a.dateApplied).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${a.status === "SHORTLISTED"
                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                            : a.status === "REJECTED"
                                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                            }`}>
                                            {a.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right flex justify-end items-center gap-2">
                                        {a.resume && (
                                            <a
                                                href={a.resume}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mr-2"
                                            >
                                                Resume <ExternalLink size={10} />
                                            </a>
                                        )}
                                        {a.status === "APPLIED" && (
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
                                        {a.status !== "APPLIED" && (
                                            <span className="text-xs text-gray-500 italic">No actions</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {mockData.applicants.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500 text-xs">
                                        No candidates have applied to your listings yet.
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

export default RecruiterApplicants