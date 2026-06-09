import { getMe } from "@/app/services/auth/auth";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const user = await getMe();

  // Redirect to sign in if user is not authenticated or session is expired
  if (!user || user.error) {
    redirect("/auth");
  }

  return <DashboardClient initialUser={user} />;
}
