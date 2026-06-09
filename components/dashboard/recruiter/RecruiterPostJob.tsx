import { getAllCategories } from '@/app/services/category/category.service';
import { createJob } from '@/app/services/job/job.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Category, UserType } from '@/types/jobTypes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function RecruiterPostJob({ user }: { user: UserType }) {
    const [jobForm, setJobForm] = useState({
        title: "",
        category: "",
        location: "",
        vacancies: 1,
        jobType: "REMOTE",
        contract: "FULLTIME",

        minSalary: "",
        maxSalary: "",

        description: "", // textarea → will convert to array
        requirements: "", // textarea → will convert to Other_requirements

        Who_can_apply: "",
        benefits: "",
        startDate: "",
        expiresAt: "",
        experienceLevel: "Senior",

        skills: "",
    });
    const router = useRouter();

    const [categoryList, setCategoryList] = useState<Category[]>([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const categoryData = async () => {
            const res = await getAllCategories();
            setCategoryList(res.data);
        };
        categoryData();
    }, []);

    const handlePostJob = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            recruiterId: user?.id,
            title: jobForm.title,
            categoryId: jobForm.category,
            description: jobForm.description
                .split("\n")
                .filter((d) => d.trim() !== ""),

            Who_can_apply: jobForm.Who_can_apply,
            benefits: jobForm.benefits,

            location: jobForm.location,

            startDate: jobForm.startDate
                ? new Date(jobForm.startDate).toISOString()
                : new Date().toISOString(),

            expiresAt: jobForm.expiresAt
                ? new Date(jobForm.expiresAt).toISOString()
                : null,

            skills: jobForm.skills
                ? jobForm.skills.split(",").map((s) => s.trim())
                : [],

            numberOfVacancies: Number(jobForm.vacancies),

            Duration: "1 Year",

            jobType: jobForm.jobType,
            contract: jobForm.contract,
            status: "ACTIVE",

            experienceLevel: jobForm.experienceLevel,

            maxSalary: String(jobForm.maxSalary),
            minSalary: String(jobForm.minSalary),

            Other_requirements: jobForm.requirements
                .split("\n")
                .filter((r) => r.trim() !== ""),
        };

        // console.log("FINAL PAYLOAD:", payload);
        setIsSubmitting(true)
        try {
            await createJob(payload);
            toast.success("Job created successfully");
            setJobForm({
                title: "",
                category: "",
                location: "",
                vacancies: 1,
                jobType: "REMOTE",
                contract: "FULLTIME",
                minSalary: "",
                maxSalary: "",
                description: "",
                requirements: "",
                Who_can_apply: "",
                benefits: "",
                startDate: "",
                expiresAt: "",
                experienceLevel: "Senior",
                skills: "",
            });
            router.push("/job")
        } catch (error) {
            console.log(error, "error")
        } finally {
            setIsSubmitting(false)
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setJobForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const inputClass = "bg-[#181816] border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:border-primary";

    return (
        <Card className="bg-[#121211] border-white/5">
            <CardHeader className="border-b border-white/5 py-4">
                <CardTitle className="text-sm font-bold tracking-wide text-white uppercase">
                    Create Job Listing
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
                <form onSubmit={handlePostJob} className="space-y-6">

                    <div className="grid md:grid-cols-2 gap-5">

                        <div className="space-y-1.5">
                            <Label htmlFor="title" className="text-xs text-gray-400 uppercase tracking-wide">
                                Job Title *
                            </Label>
                            <Input
                                name="title"
                                id="title"
                                value={jobForm.title}
                                onChange={handleInputChange}
                                className={`${inputClass} h-11`}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="category" className="text-xs text-gray-400 uppercase tracking-wide">
                                Category
                            </Label>
                            <select
                                name="category"
                                id="category"
                                value={jobForm.category}
                                onChange={handleInputChange}
                                className="h-11 w-full bg-[#181816] border border-white/10 rounded-lg px-3 text-sm text-white"
                            >
                                <option value="">Select Category</option>
                                {categoryList.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="location" className="text-xs text-gray-400 uppercase tracking-wide">
                                Location *
                            </Label>
                            <Input
                                name="location"
                                id="location"
                                value={jobForm.location}
                                onChange={handleInputChange}
                                className={`${inputClass} h-11`}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="vacancies" className="text-xs text-gray-400 uppercase tracking-wide">
                                Vacancies
                            </Label>
                            <Input
                                type="number"
                                name="vacancies"
                                id="vacancies"
                                value={jobForm.vacancies}
                                onChange={handleInputChange}
                                className={`${inputClass} h-11`}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="jobType" className="text-xs text-gray-400 uppercase tracking-wide">
                                Job Type
                            </Label>
                            <select
                                name="jobType"
                                id="jobType"
                                value={jobForm.jobType}
                                onChange={handleInputChange}
                                className="h-11 w-full bg-[#181816] border border-white/10 rounded-lg px-3 text-sm text-white"
                            >
                                <option value="">Select Job Type</option>
                                <option value="REMOTE">Remote</option>
                                <option value="ONSITE">Onsite</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="contract" className="text-xs text-gray-400 uppercase tracking-wide">
                                Contract Type
                            </Label>
                            <select
                                name="contract"
                                id="contract"
                                value={jobForm.contract}
                                onChange={handleInputChange}
                                className="h-11 w-full bg-[#181816] border border-white/10 rounded-lg px-3 text-sm text-white"
                            >
                                <option value="">Select Contract Type</option>
                                <option value="FULLTIME">Full Time</option>
                                <option value="PARTTIME">Part Time</option>
                                <option value="INTERNSHIP">Internship</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="minSalary" className="text-xs text-gray-400 uppercase tracking-wide">
                                Min Salary
                            </Label>
                            <Input
                                type="number"
                                name="minSalary"
                                id="minSalary"
                                value={jobForm.minSalary}
                                onChange={handleInputChange}
                                className={`${inputClass} h-11`}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="maxSalary" className="text-xs text-gray-400 uppercase tracking-wide">
                                Max Salary
                            </Label>
                            <Input
                                type="number"
                                name="maxSalary"
                                id="maxSalary"
                                value={jobForm.maxSalary}
                                onChange={handleInputChange}
                                className={`${inputClass} h-11`}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="maxSalary" className="text-xs text-gray-400 uppercase tracking-wide">Who can apply</Label>
                            <Textarea
                                name="Who_can_apply"
                                value={jobForm.Who_can_apply}
                                onChange={handleInputChange}
                                className={`${inputClass} min-h-[90px]`}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="maxSalary" className="text-xs text-gray-400 uppercase tracking-wide">Benefits</Label>
                            <Textarea
                                name="benefits"
                                value={jobForm.benefits}
                                onChange={handleInputChange}
                                className={`${inputClass} min-h-[90px]`}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="maxSalary" className="text-xs text-gray-400 uppercase tracking-wide">Start Date</Label>
                            <Input
                                type="date"
                                name="startDate"
                                value={jobForm.startDate}
                                onChange={handleInputChange}
                                className={`${inputClass} h-11`}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs text-gray-400 uppercase tracking-wide">
                                Expiry Date
                            </Label>
                            <Input
                                type="date"
                                name="expiresAt"
                                value={jobForm.expiresAt}
                                onChange={handleInputChange}
                                className={`${inputClass} h-11`}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="maxSalary" className="text-xs text-gray-400 uppercase tracking-wide">Experience Level</Label>
                            <select
                                name="experienceLevel"
                                value={jobForm.experienceLevel}
                                onChange={handleInputChange}
                                className="h-11 w-full bg-[#181816] border border-white/10 rounded-lg px-3 text-sm text-white"
                            >
                                <option value="">Select Experience Level</option>
                                <option value="Entry">Entry</option>
                                <option value="Mid">Mid</option>
                                <option value="Senior">Senior</option>
                                <option value="Lead">Lead</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="maxSalary" className="text-xs text-gray-400 uppercase tracking-wide">Skills (comma separated)</Label>
                            <Input
                                name="skills"
                                value={jobForm.skills}
                                onChange={handleInputChange}
                                className={`${inputClass} h-11`}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 mt-4">

                        <div>
                            <Label className="text-xs text-gray-400 uppercase tracking-wide">
                                Job Description *
                            </Label>
                            <Textarea
                                name="description"
                                value={jobForm.description}
                                onChange={handleInputChange}
                                className={`${inputClass} min-h-[120px] mt-2`}
                            />
                        </div>

                        <div>
                            <Label className="text-xs text-gray-400 uppercase tracking-wide">
                                Job Requirements
                            </Label>
                            <Textarea
                                name="requirements"
                                value={jobForm.requirements}
                                onChange={handleInputChange}
                                className={`${inputClass} min-h-[100px] mt-2`}
                            />
                        </div>

                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-11 px-6 text-xs font-bold uppercase tracking-wider"
                        >
                            {isSubmitting ? "Publishing..." : "Publish Job Listing"}
                        </Button>
                    </div>

                </form>
            </CardContent>
        </Card>
    );
}

export default RecruiterPostJob