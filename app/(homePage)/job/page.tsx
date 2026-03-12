"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  SlidersHorizontal,
  Bell,
  Search,
  MapPin,
  ChevronDown,
  X,
  ArrowDownWideNarrow,
  PenTool,
  Code,
  Camera,
  BarChart,
  Briefcase,
  Globe,
} from "lucide-react";

// Define types for job posting
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote" | "internship";
  salary: string;
  salaryMin: number;
  salaryMax: number;
  description: string;
  tags: string[];
  logo: React.ReactNode;
  postedAt: string;
  postedDate: Date;
  category: string;
  experience: "Entry" | "Mid" | "Senior" | "Lead";
}

// Extended sample job data with more variety
const jobsData: Job[] = [
  {
    id: "1",
    title: "Senior Product Designer",
    company: "Figma",
    location: "San Francisco, CA",
    type: "full-time",
    salary: "$130k – $150k",
    salaryMin: 130000,
    salaryMax: 150000,
    description: "Lead product design for core design system and collaborate with product managers.",
    tags: ["UI/UX", "Figma", "Design Systems"],
    logo: <PenTool className="w-5 h-5" />,
    postedAt: "2 days ago",
    postedDate: new Date("2024-03-10"),
    category: "Design",
    experience: "Senior",
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Vercel",
    location: "Remote",
    type: "remote",
    salary: "$120k – $160k",
    salaryMin: 120000,
    salaryMax: 160000,
    description: "Build and maintain Next.js applications and contribute to open source.",
    tags: ["React", "Next.js", "TypeScript"],
    logo: <Code className="w-5 h-5" />,
    postedAt: "1 day ago",
    postedDate: new Date("2024-03-11"),
    category: "Engineering",
    experience: "Mid",
  },
  {
    id: "3",
    title: "Product Manager",
    company: "Linear",
    location: "New York, NY",
    type: "full-time",
    salary: "$140k – $180k",
    salaryMin: 140000,
    salaryMax: 180000,
    description: "Drive product strategy and execution for our issue tracking platform.",
    tags: ["Product", "Strategy", "Agile"],
    logo: <Briefcase className="w-5 h-5" />,
    postedAt: "3 days ago",
    postedDate: new Date("2024-03-09"),
    category: "Product",
    experience: "Senior",
  },
  {
    id: "4",
    title: "UX Researcher",
    company: "Adobe",
    location: "San Jose, CA",
    type: "contract",
    salary: "$90k – $120k",
    salaryMin: 90000,
    salaryMax: 120000,
    description: "Conduct user research and usability studies for creative cloud products.",
    tags: ["Research", "Usability", "Interviews"],
    logo: <Camera className="w-5 h-5" />,
    postedAt: "5 days ago",
    postedDate: new Date("2024-03-07"),
    category: "Design",
    experience: "Mid",
  },
  {
    id: "5",
    title: "Data Analyst",
    company: "Stripe",
    location: "Seattle, WA",
    type: "full-time",
    salary: "$110k – $140k",
    salaryMin: 110000,
    salaryMax: 140000,
    description: "Analyze payment data and build dashboards for business insights.",
    tags: ["SQL", "Python", "Tableau"],
    logo: <BarChart className="w-5 h-5" />,
    postedAt: "1 week ago",
    postedDate: new Date("2024-03-05"),
    category: "Data",
    experience: "Entry",
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "GitHub",
    location: "Remote",
    type: "remote",
    salary: "$135k – $165k",
    salaryMin: 135000,
    salaryMax: 165000,
    description: "Manage infrastructure and improve CI/CD pipelines for millions of developers.",
    tags: ["AWS", "Kubernetes", "Terraform"],
    logo: <Globe className="w-5 h-5" />,
    postedAt: "4 days ago",
    postedDate: new Date("2024-03-08"),
    category: "Engineering",
    experience: "Senior",
  },
  {
    id: "7",
    title: "Junior UX Designer",
    company: "Airbnb",
    location: "San Francisco, CA",
    type: "full-time",
    salary: "$80k – $95k",
    salaryMin: 80000,
    salaryMax: 95000,
    description: "Assist in creating beautiful and functional designs for our platform.",
    tags: ["UI/UX", "Figma", "Prototyping"],
    logo: <PenTool className="w-5 h-5" />,
    postedAt: "2 days ago",
    postedDate: new Date("2024-03-10"),
    category: "Design",
    experience: "Entry",
  },
  {
    id: "8",
    title: "Backend Engineer",
    company: "Stripe",
    location: "Remote",
    type: "part-time",
    salary: "$90k – $110k",
    salaryMin: 90000,
    salaryMax: 110000,
    description: "Build scalable APIs and payment processing systems.",
    tags: ["Go", "PostgreSQL", "Redis"],
    logo: <Code className="w-5 h-5" />,
    postedAt: "6 days ago",
    postedDate: new Date("2024-03-06"),
    category: "Engineering",
    experience: "Mid",
  },
];

// Filter state interface
interface FilterState {
  search: string;
  location: string;
  category: string;
  experience: string[];
  jobTypes: string[];
  salaryMin: number;
  salaryMax: number;
  datePosted: string;
}

// Badge component for job type
const JobTypeBadge: React.FC<{ type: Job["type"] }> = ({ type }) => {
  const styles = {
    "full-time": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "part-time": "bg-blue-50 text-blue-700 border-blue-200",
    contract: "bg-amber-50 text-amber-700 border-amber-200",
    remote: "bg-purple-50 text-purple-700 border-purple-200",
    internship: "bg-slate-50 text-white border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${styles[type]}`}
    >
      {type}
    </span>
  );
};

// Main component
export default function JobBoardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize filter state from URL params
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    category: searchParams.get("category") || "",
    experience: searchParams.getAll("experience") || [],
    jobTypes: searchParams.getAll("type") || [],
    salaryMin: Number(searchParams.get("salaryMin")) || 40000,
    salaryMax: Number(searchParams.get("salaryMax")) || 160000,
    datePosted: searchParams.get("datePosted") || "past-week",
  });

  // Local UI state for salary range (for smoother slider)
  const [salaryRange, setSalaryRange] = useState({
    min: filters.salaryMin,
    max: filters.salaryMax,
  });

  // Update URL when filters change
  const updateUrl = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.location) params.set("location", newFilters.location);
    if (newFilters.category) params.set("category", newFilters.category);
    newFilters.experience.forEach(exp => params.append("experience", exp));
    newFilters.jobTypes.forEach(type => params.append("type", type));
    if (newFilters.salaryMin !== 40000) params.set("salaryMin", newFilters.salaryMin.toString());
    if (newFilters.salaryMax !== 160000) params.set("salaryMax", newFilters.salaryMax.toString());
    if (newFilters.datePosted !== "past-week") params.set("datePosted", newFilters.datePosted);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router]);

  // Handle filter changes
  const handleFilterChange = useCallback((key: keyof FilterState, value: any) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      updateUrl(newFilters);
      return newFilters;
    });
  }, [updateUrl]);

  // Handle checkbox groups
  const handleCheckboxGroup = (key: "experience" | "jobTypes", value: string, checked: boolean) => {
    setFilters(prev => {
      const current = [...prev[key]];
      const newValues = checked 
        ? [...current, value]
        : current.filter(v => v !== value);
      
      const newFilters = { ...prev, [key]: newValues };
      updateUrl(newFilters);
      return newFilters;
    });
  };

  // Handle salary range change
  const handleSalaryChange = (type: "min" | "max", value: number) => {
    setSalaryRange(prev => {
      const newRange = { ...prev, [type]: value };
      return newRange;
    });
  };

  // Apply salary filter after drag (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFilterChange("salaryMin", salaryRange.min);
      handleFilterChange("salaryMax", salaryRange.max);
    }, 500);
    return () => clearTimeout(timer);
  }, [salaryRange, handleFilterChange]);

  // Reset all filters
  const resetFilters = () => {
    const resetState = {
      search: "",
      location: "",
      category: "",
      experience: [],
      jobTypes: [],
      salaryMin: 40000,
      salaryMax: 160000,
      datePosted: "past-week",
    };
    setFilters(resetState);
    setSalaryRange({ min: 40000, max: 160000 });
    router.push(pathname, { scroll: false });
  };

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      // Search filter
      if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !job.company.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Location filter
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && job.category !== filters.category) {
        return false;
      }

      // Experience filter
      if (filters.experience.length > 0 && !filters.experience.includes(job.experience)) {
        return false;
      }

      // Job type filter
      if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.type)) {
        return false;
      }

      // Salary filter
      if (job.salaryMin < filters.salaryMin || job.salaryMax > filters.salaryMax) {
        return false;
      }

      // Date posted filter
      if (filters.datePosted !== "any-time") {
        const daysAgo = Math.floor((new Date().getTime() - job.postedDate.getTime()) / (1000 * 3600 * 24));
        switch (filters.datePosted) {
          case "past-24h":
            if (daysAgo > 1) return false;
            break;
          case "past-week":
            if (daysAgo > 7) return false;
            break;
          case "past-month":
            if (daysAgo > 30) return false;
            break;
        }
      }

      return true;
    });
  }, [filters]);

  // Format salary for display
  const formatSalary = (min: number, max: number) => {
    return `$${Math.round(min/1000)}k – $${Math.round(max/1000)}k`;
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {/* Main content: filter sidebar + job grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* LEFT: FILTER SECTION */}
          <aside className="lg:w-80 shrink-0">
            <div className="bg-mist rounded-xl shadow-sm border border-gray-700 p-5 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto no-scrollbar">
              {/* Filter header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-medium text-base flex items-center gap-2 text-white">
                  <SlidersHorizontal className="w-4 h-4 text-white" />
                  Filters
                </h2>
                <button 
                  onClick={resetFilters}
                  className="text-xs text-white hover:text-slate-600 transition"
                >
                  Reset all
                </button>
              </div>

              {/* Search input */}
              <div className="relative mb-6">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                <input
                  type="text"
                  placeholder="Job title, keyword..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full bg-[#111110] border border-gray-600 rounded-lg py-2 pl-9 pr-4 text-sm placeholder:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                />
              </div>

              {/* Location filter */}
              <div className="mb-6">
                <label className="text-xs font-medium uppercase tracking-wider text-white block mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                  <input
                    type="text"
                    placeholder="City or remote"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    className="w-full bg-[#111110] border border-gray-600 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>

              {/* Category dropdown */}
              <div className="mb-6">
                <label className="text-xs font-medium uppercase tracking-wider text-white block mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="w-full bg-[#111110] border text-white border-gray-600 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-500 appearance-none"
                >
                  <option value="">All Categories</option>
                  <option value="Design">Design</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Data">Data</option>
                </select>
              </div>

              {/* Experience level pills */}
              <div className="mb-6">
                <label className="text-xs font-medium uppercase tracking-wider text-white block mb-3">
                  Experience level
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Entry", "Mid", "Senior", "Lead"].map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        const isSelected = filters.experience.includes(level);
                        handleCheckboxGroup("experience", level, !isSelected);
                      }}
                      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        !filters.experience.includes(level)
                          ? "bg-slate-800 text-white border-slate-800"
                          : "bg-slate-300 border-transparent hover:bg-slate-200 text-black"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job type checkboxes */}
              <div className="mb-6">
                <label className="text-xs font-medium uppercase tracking-wider text-white block mb-3">
                  Job type
                </label>
                <div className="space-y-2">
                  {[
                    { label: "Full-time", value: "full-time", count: 5 },
                    { label: "Part-time", value: "part-time", count: 1 },
                    { label: "Contract", value: "contract", count: 1 },
                    { label: "Remote", value: "remote", count: 3 },
                    { label: "Internship", value: "internship", count: 0 },
                  ].map(({ label, value, count }) => (
                    <label
                      key={value}
                      className="flex items-center gap-2 text-sm text-white"
                    >
                      <input
                        type="checkbox"
                        checked={filters.jobTypes.includes(value)}
                        onChange={(e) => handleCheckboxGroup("jobTypes", value, e.target.checked)}
                        className="rounded border-slate-300 text-slate-600 focus:ring-slate-200 focus:ring-offset-0"
                      />
                      <span>{label}</span>
                      <span className="text-xs text-white ml-auto">
                        {jobsData.filter(j => j.type === value).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary range */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-white">
                    Salary / year
                  </label>
                  <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-200">
                    {formatSalary(salaryRange.min, salaryRange.max)}
                  </span>
                </div>
                <div className="relative pt-4 px-1">
                  <input
                    type="range"
                    min="40000"
                    max="160000"
                    step="5000"
                    value={salaryRange.min}
                    onChange={(e) => handleSalaryChange("min", Number(e.target.value))}
                    className="absolute w-full h-1.5 bg-slate-800 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-slate-200 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <input
                    type="range"
                    min="40000"
                    max="160000"
                    step="5000"
                    value={salaryRange.max}
                    onChange={(e) => handleSalaryChange("max", Number(e.target.value))}
                    className="absolute w-full h-1.5 bg-transparent rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-slate-200 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between mt-8 text-xs text-white">
                    <span>$40k</span>
                    <span>$160k+</span>
                  </div>
                </div>
              </div>

              {/* Date posted radio */}
              <div className="mb-4">
                <label className="text-xs font-medium uppercase tracking-wider text-white block mb-3">
                  Date posted
                </label>
                <div className="space-y-1.5">
                  {[
                    { label: "Any time", value: "any-time" },
                    { label: "Past 24 hours", value: "past-24h" },
                    { label: "Past week", value: "past-week" },
                    { label: "Past month", value: "past-month" },
                  ].map(({ label, value }) => (
                    <label
                      key={value}
                      className="flex items-center gap-2 text-sm text-white"
                    >
                      <input
                        type="radio"
                        name="datePosted"
                        value={value}
                        checked={filters.datePosted === value}
                        onChange={(e) => handleFilterChange("datePosted", e.target.value)}
                        className="text-slate-500 border-slate-300 focus:ring-slate-200"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: JOB LISTINGS */}
          <main className="flex-1 min-w-0">
            {/* Results header and sort */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full shadow-sm border border-slate-800">
                <span className="font-medium text-white">{filteredJobs.length}</span> jobs match
              </p>
              {/* <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
                <ArrowDownWideNarrow className="w-4 h-4 text-white" />
                <span className="text-sm text-slate-600">Sort by</span>
                <span className="text-sm font-medium text-slate-800">Newest</span>
                <ChevronDown className="w-4 h-4 text-white ml-1" />
              </div> */}
            </div>

            {/* Job cards grid */}
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
                  >
                    {/* Header with logo, title, type */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                        {job.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 truncate">
                          {job.title}
                        </h3>
                        <p className="text-sm text-slate-500 truncate">
                          {job.company} · {job.location}
                        </p>
                      </div>
                      <JobTypeBadge type={job.type} />
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 mt-3 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Tags and salary */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-1 flex-wrap">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-white">
                        {job.salary}
                      </span>
                    </div>

                    {/* Posted time */}
                    <div className="mt-3 text-[10px] text-white border-t border-slate-100 pt-2">
                      Posted {job.postedAt}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No jobs found</h3>
                <p className="text-sm text-slate-500">Try adjusting your filters to see more results</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}