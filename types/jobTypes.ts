export interface FilterState {
  search: string;
  location: string;
  category: string;
  experience: string[];
  jobType: string;
  contact: string[];
  salaryMin: number;
  salaryMax: number;
  datePosted: string;
  page?: number;
}

export interface Category{
  id: string,
  name: string
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Recruiter {
  id: string;
  userId: string;
  about: string | null;
  companyName: string | null;
  companyImage: string | null;
  website: string | null;
  location: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Job {
  id: string;
  title: string;
  description: string[];
  Who_can_apply: string;
  benefits: string;
  location: string;
  startDate: string;
  skills: string[];
  numberOfVacancies: number;
  Duration: string;
  jobType: "REMOTE" | "ONSITE" | "HYBRID" | string;
  contract: "FULLTIME" | "PARTTIME" | "CONTRACT" | string;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  expiresAt: string;
  categoryId: string;
  experienceLevel: string;
  maxSalary: string;
  minSalary: string;
  other_requirements: string[];
  recruiterId: string;

  recruiter: Recruiter;

  success?: boolean;
}

export type Role = "USER" | "RECRUITER" | "ADMIN";

export type ApplicationStatus = "APPLIED" | "SHORTLISTED" | "REJECTED"

export interface UserApplication{
  id: string;
  jobId: string;
  userId: string;
  resume?: string | null;
  coverLetter?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: Role;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  applications?: UserApplication[]

  userInfo?: {
    about?: string | null;
    image?: string | null;
    website?: string | null;
    location?: string | null;
    phone?: string | null;
    linkedin?: string | null;
    github?: string | null;
    resume?: string | null;
  } | null;

  recruiter?: {
    about?: string | null;
    companyName?: string | null;
    companyImage?: string | null;
    website?: string | null;
    location?: string | null;
    phone?: string | null;
  } | null;
};