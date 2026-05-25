"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, Search, MapPin, Briefcase } from "lucide-react";
import { useDebounce } from "use-debounce";
import { getAllJobs } from "@/app/services/job/job.service";
import { Category, FilterState, Job } from "@/types/jobTypes";
import { getAllCategories } from "@/app/services/category/category.service";
import Loader from "@/components/Loader";
import Link from "next/link";

// Main component
export default function JobBoardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize filter state from URL params
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    category: searchParams.get("category") || "",
    experience: searchParams.getAll("experience") || [],
    jobType: searchParams.get("type") || "",
    contact: searchParams.getAll("contact") || [],
    salaryMin: Number(searchParams.get("salaryMin")) || 40000,
    salaryMax: Number(searchParams.get("salaryMax")) || 160000,
    datePosted: searchParams.get("datePosted") || "any-time",
  });

  // Local UI state for salary range (for smoother slider)
  const [salaryRange, setSalaryRange] = useState({
    min: filters.salaryMin,
    max: filters.salaryMax,
  });

  // Debounced search and location
  const [searchInput, setSearchInput] = useState(filters.search);
  const [locationInput, setLocationInput] = useState(filters.location);
  const [debouncedSearch] = useDebounce(searchInput, 2000);
  const [debouncedLocation] = useDebounce(locationInput, 2000);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  // Ref to skip initial URL update
  const isInitialMount = useRef(true);

  // Update URL when filters change
  const updateUrl = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();

      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.location) params.set("location", newFilters.location);
      if (newFilters.category) params.set("category", newFilters.category);
      newFilters.experience.forEach((exp) => params.append("experience", exp));
      if (newFilters.jobType) params.set("type", newFilters.jobType);
      newFilters.contact.forEach((contact) => params.append("contact", contact));
      if (newFilters.salaryMin !== 40000) params.set("salaryMin", newFilters.salaryMin.toString());
      if (newFilters.salaryMax !== 160000) params.set("salaryMax", newFilters.salaryMax.toString());
      if (newFilters.datePosted !== "past-week") params.set("datePosted", newFilters.datePosted);

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router],
  );
  // Update URL when filters change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    updateUrl(filters);
  }, [filters, updateUrl]);
  const handleFilterChange = useCallback((key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Update filters when debounced search/location change
  useEffect(() => {
    handleFilterChange("search", debouncedSearch);
  }, [debouncedSearch, handleFilterChange]);

  useEffect(() => {
    handleFilterChange("location", debouncedLocation);
  }, [debouncedLocation, handleFilterChange]);

  // Sync local inputs with filters (for URL changes)
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  useEffect(() => {
    setLocationInput(filters.location);
  }, [filters.location]);

  // Handle checkbox groups
  const handleCheckboxGroup = (key: "experience" | "contact", value: string, checked: boolean) => {
    setFilters((prev) => {
      const current = [...prev[key]];
      const newValues = checked ? [...current, value] : current.filter((v) => v !== value);

      return { ...prev, [key]: newValues };
    });
  };

  // Handle salary range change
  const handleSalaryChange = (type: "min" | "max", value: number) => {
    setSalaryRange((prev) => {
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
      jobType: "",
      contact: [],
      salaryMin: 40000,
      salaryMax: 160000,
      datePosted: "any-time",
    };
    setFilters(resetState);
    setSalaryRange({ min: 40000, max: 160000 });
    setSearchInput("");
    setLocationInput("");
    router.push(pathname, { scroll: false });
  };

  useEffect(() => {
    setIsLoading(true);
    const jobData = async () => {
      const res = await getAllJobs({
        search: filters.search,
        location: filters.location,
        category: filters.category,
        experience: filters.experience,
        jobType: filters.jobType,
        contact: filters.contact,
        salaryMin: filters.salaryMin,
        salaryMax: filters.salaryMax,
        datePosted: filters.datePosted,
        page: page,
      });

      setJobs(res?.data?.jobs || []);
      setTotalPages(res?.data?.meta?.totalPages || 1);
      setIsLoading(false);
    };

    jobData();
  }, [filters, page]);

  useEffect(() => {
    const categoryData = async () => {
      const res = await getAllCategories();
      setCategoryList(res.data);
    };
    categoryData();
  }, []);

  // Format salary for display
  const formatSalary = (min: string, max: string) => {
    return `$${Math.round(Number(min) / 1000)}k – $${Math.round(Number(max) / 1000)}k`;
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
                <button onClick={resetFilters} className="text-xs text-white hover:text-slate-600 transition">
                  Reset all
                </button>
              </div>

              {/* Search input */}
              <div className="relative mb-6">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                <input
                  type="text"
                  placeholder="Job title, keyword..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-[#111110] border border-gray-600 rounded-lg py-2 pl-9 pr-4 text-sm placeholder:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                />
              </div>

              {/* Location filter */}
              <div className="mb-6">
                <label className="text-xs font-medium uppercase tracking-wider text-white block mb-2">Location</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                  <input
                    type="text"
                    placeholder="City or remote"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    className="w-full bg-[#111110] border border-gray-600 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>

              {/* Category dropdown */}
              <div className="mb-6">
                <label className="text-xs font-medium uppercase tracking-wider text-white block mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                  className="w-full bg-[#111110] border text-white border-gray-600 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-500 appearance-none"
                >
                  <option value="">All Categories</option>
                  {categoryList?.map((category) => (
                    <option key={category.name} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience level pills */}
              <div className="mb-6">
                <label className="text-xs font-medium uppercase tracking-wider text-white block mb-3">Experience level</label>
                <div className="flex flex-wrap gap-2">
                  {["Entry", "Mid", "Senior", "Lead"].map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        const isSelected = filters.experience.includes(level);
                        handleCheckboxGroup("experience", level, !isSelected);
                      }}
                      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        !filters.experience.includes(level) ? "bg-slate-800 text-white border-slate-800" : "bg-slate-300 border-transparent hover:bg-slate-200 text-black"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job type radio buttons */}
              <div className="mb-6">
                <label className="text-xs font-medium uppercase tracking-wider text-white block mb-3">Job type</label>
                <div className="space-y-2">
                  {[
                    { label: "Remote", value: "remote" },
                    { label: "Onsite", value: "onsite" },
                  ].map(({ label, value }) => (
                    <label key={value} className="flex items-center gap-2 text-sm text-white">
                      <input
                        type="radio"
                        name="jobType"
                        value={value}
                        checked={filters.jobType === value}
                        onChange={(e) => handleFilterChange("jobType", e.target.value)}
                        className="text-slate-600 border-slate-300 focus:ring-slate-200"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="text-xs font-medium uppercase tracking-wider text-white block mb-3">Contact</label>
                <div className="space-y-2">
                  {[
                    { label: "FullTime", value: "fulltime" },
                    { label: "PartTime", value: "parttime" },
                    { label: "Internship", value: "internship" },
                  ].map(({ label, value }) => (
                    <label key={value} className="flex items-center gap-2 text-sm text-white">
                      <input
                        type="checkbox"
                        checked={filters.contact.includes(value)}
                        onChange={(e) => handleCheckboxGroup("contact", value, e.target.checked)}
                        className="rounded border-slate-300 text-slate-600 focus:ring-slate-200 focus:ring-offset-0"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary range */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-white">Salary / year</label>
                  <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-200">{formatSalary(salaryRange.min, salaryRange.max)}</span>
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
                <label className="text-xs font-medium uppercase tracking-wider text-white block mb-3">Date posted</label>
                <div className="space-y-1.5">
                  {[
                    { label: "Any time", value: "any-time" },
                    { label: "Past 24 hours", value: "past-24h" },
                    { label: "Past week", value: "past-week" },
                    { label: "Past month", value: "past-month" },
                  ].map(({ label, value }) => (
                    <label key={value} className="flex items-center gap-2 text-sm text-white">
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

          {isLoading ? (
            <div className="w-full flex items-center justify-center">
            <Loader/>
            </div>
          ) : (
            <>
              {/* RIGHT: JOB LISTINGS */}
              <main className="flex-1 min-w-0">
                {/* Results header and sort */}
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full shadow-sm border border-slate-800">
                    <span className="font-medium text-white">{jobs.length}</span> jobs match
                  </p>
                </div>

                {/* Job cards grid */}
                {jobs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                    {jobs.map((job) => (
                      <Link href={`/job/${job.id}`} key={job.id} className={`cursor-pointer bg-[#111110] hover:bg-[#161614] p-9 relative transition-all duration-300 h-[16rem]`}>
                        {/* Company */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 bg-primary/10 border border-primary/15 flex items-center justify-center font-bold text-[0.72rem] text-primary">
                            {job?.recruiter?.companyName?.slice(0, 1)}
                          </div>
                          <span className="text-[0.78rem] text-muted tracking-wider">{job?.recruiter?.companyName}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-syne font-bold text-[1.15rem] text-cream leading-[1.2] tracking-[-0.01em] mb-3.5 pr-10">{job?.title}</h3>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {job?.skills?.map((tag) => (
                            <span key={tag} className={`text-[0.65rem] px-3 py-1 border tracking-wider uppercase`}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-t-mist-900 absolute bottom-5 w-[80%]">
                          <div className="font-syne font-extrabold text-[1.08rem] text-cream">{formatSalary(job?.minSalary, job?.maxSalary)}</div>
                          <div className="text-[0.75rem] text-muted">{job?.location}</div>
                        </div>

                        {/* <div className="flex items-start gap-3">
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

                    
                    <p className="text-xs text-slate-500 mt-3 line-clamp-2">
                      {job.description}
                    </p>

                    
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

                    
                    <div className="mt-3 text-[10px] text-white border-t border-slate-100 pt-2">
                      Posted {job.postedAt}
                    </div> */}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-gray-800 p-12 text-center">
                    <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No jobs found</h3>
                    <p className="text-sm text-slate-300">Try adjusting your filters to see more results</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
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
              </main>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
