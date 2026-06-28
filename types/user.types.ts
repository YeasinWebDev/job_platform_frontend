export interface UserOverviewResponse {
    totalJobsApplied?: number;
    totalJobsSaved?: number;
    totalShortlisted?: number;
    recentApplications?: {
        id: string;
        createdAt: string;
        status: string;
        userId: string;
        jobId: string;
        job: {
            id: string;
            title: string;
            recruiter: {
                companyName: string;
                companyImage?: string;
            };
        };
    }[];
    applicationByType: { REMOTE: number; ONSITE: number };
    applicationByContract: { FULLTIME: number; PARTTIME: number; INTERNSHIP: number };
}