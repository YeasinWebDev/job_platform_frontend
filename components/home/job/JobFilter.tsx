import { Category } from '@/types/jobTypes';
import { MapPin, Search, SlidersHorizontal } from 'lucide-react';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


function JobFilter({ resetFilters, categoryList, searchInput, setSearchInput, locationInput, setLocationInput, handleFilterChange, handleCheckboxGroup, salaryRange, handleSalaryChange, formatSalary, filters }: any) {
    return (
        <aside className="lg:w-80 shrink-0 relative">
            <div className="bg-mist rounded-xl shadow-sm border border-gray-700 p-5 ">
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

                <div className='relative max-h-[calc(100vh-3rem)] overflow-y-auto no-scrollbar'>
                    {/* Search input */}
                    <div className="relative mb-6 mt-6">
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
                            {categoryList?.map((category: Category) => (
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
                                    className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition ${!filters.experience.includes(level) ? "bg-slate-800 text-white border-slate-800" : "bg-slate-300 border-transparent hover:bg-slate-200 text-black"
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
                            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-200">{formatSalary(salaryRange.min.toString(), salaryRange.max.toString())}</span>
                        </div>
                        <div className="relative pt-4 px-1">
                            <input
                                type="range"
                                min="0"
                                max="160000"
                                step="5000"
                                value={salaryRange.min}
                                onChange={(e) => handleSalaryChange("min", Number(e.target.value))}
                                className="absolute w-full h-1.5 bg-slate-800 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-slate-200 [&::-webkit-slider-thumb]:cursor-pointer"
                            />
                            <input
                                type="range"
                                min="0"
                                max="160000"
                                step="5000"
                                value={salaryRange.max}
                                onChange={(e) => handleSalaryChange("max", Number(e.target.value))}
                                className="absolute w-full h-1.5 bg-transparent rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-slate-200 [&::-webkit-slider-thumb]:cursor-pointer"
                            />
                            <div className="flex justify-between mt-8 text-xs text-white">
                                <span>$0k</span>
                                <span>$160k+</span>
                            </div>
                        </div>
                    </div>

                    {/* Date posted radio */}
                    <div className="mb-10">
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
            </div>
        </aside>
    )
}

export default JobFilter