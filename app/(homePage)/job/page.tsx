"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Bookmark, Briefcase } from "lucide-react";
import { useDebounce } from "use-debounce";
import { getAllJobs, createBookmark as createBookmarkService, deleteBookmark as deleteBookmarkService } from "@/app/services/job/job.service";
import { Category, FilterState, Job } from "@/types/jobTypes";
import { getAllCategories } from "@/app/services/category/category.service";
import Loader from "@/components/Loader";
import Link from "next/link";
import JobFilter from "@/components/home/job/JobFilter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getMe } from "@/app/services/auth/auth";
import toast from "react-hot-toast";

// Main component
export default function JobBoardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState()

  // Initialize filter state from URL params
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    category: searchParams.get("category") || "",
    experience: searchParams.getAll("experience") || [],
    jobType: searchParams.get("type") || "",
    contact: searchParams.getAll("contact") || [],
    salaryMin: Number(searchParams.get("salaryMin")) || 0,
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
      salaryMin: 0,
      salaryMax: 160000,
      datePosted: "any-time",
    };
    setFilters(resetState);
    setSalaryRange({ min: 0, max: 160000 });
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
      const userData = await getMe();
      setUserId(userData.id);

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



  const isBookmarked = (bookmarkedBy: { id: string }[]) => {
    return bookmarkedBy.some((i) => i.id === userId);
  };

  const createBookmark = async (jobId: string) => {
    await createBookmarkService(jobId);
    toast.success("Job bookmarked successfully");
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
            ...job,
            bookmarkedBy: [...job.bookmarkedBy, { id: userId! as string }],
          }
          : job
      )
    );
    router.refresh()
  }

  const deleteBookmark = async (jobId: string) => {
    await deleteBookmarkService(jobId);
    toast.success("Job removed from bookmark");
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
            ...job,
            bookmarkedBy: job.bookmarkedBy.filter((i) => i.id !== userId),
          }
          : job
      )
    );
    router.refresh()
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Main content: filter sidebar + job grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* LEFT: FILTER SECTION */}
          <div className="lg:w-80 shrink-0 hidden lg:block">
            <JobFilter
              resetFilters={resetFilters}
              categoryList={categoryList}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              locationInput={locationInput}
              setLocationInput={setLocationInput}
              handleFilterChange={handleFilterChange}
              handleCheckboxGroup={handleCheckboxGroup}
              salaryRange={salaryRange}
              handleSalaryChange={handleSalaryChange}
              formatSalary={formatSalary}
              filters={filters}
            />
          </div>

          <Sheet>
            {/* @ts-ignore */}
            <SheetTrigger asChild className="lg:hidden">
              <div className="flex items-end justify-end">
                <Button className='p-4 rounded'>Filters</Button>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden bg-black">
              <JobFilter
                resetFilters={resetFilters}
                categoryList={categoryList}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                locationInput={locationInput}
                setLocationInput={setLocationInput}
                handleFilterChange={handleFilterChange}
                handleCheckboxGroup={handleCheckboxGroup}
                salaryRange={salaryRange}
                handleSalaryChange={handleSalaryChange}
                formatSalary={formatSalary}
                filters={filters}
              />
            </SheetContent>
          </Sheet>

          {isLoading && <div className="w-full flex items-center justify-center">
            <Loader />
          </div>}
          {
            !isLoading && <>
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
                      <Link href={`/job/${job.id}`} key={job.id} className={`cursor-pointer relative bg-[#111110] hover:bg-[#161614] p-9 transition-all duration-300 h-64`}>
                        <div className="text-[0.7rem] text-red-400 absolute top-10 right-10 flex items-center justify-center gap-5">
                          <span>Expires: {new Date(job.expiresAt).toLocaleDateString()}</span>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              isBookmarked(job.bookmarkedBy) ? deleteBookmark(job.id) : createBookmark(job.id);
                            }}
                            className={`p-0 bg-transparent ${isBookmarked(job.bookmarkedBy) ? "text-primary" : ""}`}
                            title=""
                          >
                            <Bookmark className="size-6 fill-current" />
                          </Button>
                        </div>
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
          }
        </div>
      </div>
    </div>
  );
}
