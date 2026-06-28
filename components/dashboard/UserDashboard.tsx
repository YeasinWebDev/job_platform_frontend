"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import UserOverview from "./user/UserOverview";
import UserAppliedJobs from "./user/UserAppliedJobs";
import UserSavedJobs from "./user/UserSavedJobs";
import UserProfile from "./user/UserProfile";
import { UserType } from "@/types/jobTypes";

interface UserDashboardProps {
  activeTab: string;
  user: UserType;
  mockData: any;
  setMockData: React.Dispatch<React.SetStateAction<any>>;
}

export default function UserDashboard({ activeTab, user, mockData, setMockData }: UserDashboardProps) {
  // Filter application statuses
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "SHORTLISTED":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "REJECTED":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SHORTLISTED":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "REJECTED":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-amber-400" />;
    }
  };

  // Remove saved job
  const handleRemoveSaved = (jobId: string) => {
    setMockData((prev: any) => ({
      ...prev,
      savedJobs: prev.savedJobs.filter((job: any) => job.id !== jobId)
    }));
  };

  // Render sub-sections based on activeTab
  switch (activeTab) {
    case "overview":
      return <UserOverview user={user} getStatusBadgeColor={getStatusBadgeColor} getStatusIcon={getStatusIcon} />

    case "applied":
      return <UserAppliedJobs getStatusBadgeColor={getStatusBadgeColor} getStatusIcon={getStatusIcon} />

    case "saved":
      return <UserSavedJobs />

    case "profile":
      return <UserProfile user={user} />

    default:
      return null;
  }
}
