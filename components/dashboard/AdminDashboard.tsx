"use client";

import AdminOverview from "./admin/AdminOverview";
import AdminManageUsers from "./admin/AdminManageUsers";
import AdminManageJobs from "./admin/AdminManageJobs";
import AdminManageApplications from "./admin/AdminManageApplications";

interface AdminDashboardProps {
  activeTab: string;
  user: any;
}

export default function AdminDashboard({
  activeTab
}: AdminDashboardProps) {
  // Config Settings

  switch (activeTab) {
    case "overview":
      return <AdminOverview />

    case "manage-users":
      return <AdminManageUsers/>
    
    case "manage-jobs":
      return <AdminManageJobs />;

    case "applications":
      return <AdminManageApplications />;

    default:
      return null;
  }
}
