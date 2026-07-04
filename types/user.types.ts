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

export interface RecruiterOverviewResponse {
    totalJobsPosted: number;
    totalApplications: number;
    totalShortlisted: number;
    activeJobs: number;
    recentApplications: {
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
        user: {
            id: string;
            name: string;
            email: string;
        };
    }[];
    applicationByType: { REMOTE: number; ONSITE: number };
    applicationByContract: { FULLTIME: number; PARTTIME: number; INTERNSHIP: number };
}