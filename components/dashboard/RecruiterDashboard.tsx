"use client";

import React from "react";
import {
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import RecruiterOverview from "./recruiter/RecruiterOverview";
import RecruiterManageJobs from "./recruiter/RecruiterManageJobs";
import RecruiterPostJob from "./recruiter/RecruiterPostJob";
import RecruiterApplicants from "./recruiter/RecruiterApplicants";
import { UserType } from "@/types/jobTypes";

interface RecruiterDashboardProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  user: UserType;
  mockData: any;
  setMockData: React.Dispatch<React.SetStateAction<any>>;
}

export default function RecruiterDashboard({
  activeTab,
  user,
  mockData,
  setMockData, 
  setActiveTab
}: RecruiterDashboardProps) {

  switch (activeTab) {
    case "overview":
      return<RecruiterOverview user={user} setActiveTab={setActiveTab}/>;

    case "manage-jobs":
      return <RecruiterManageJobs />;

    case "post-job":
      return <RecruiterPostJob user={user} />

    case "applicants":
      return <RecruiterApplicants />

    default:
      return null;
  }
}
