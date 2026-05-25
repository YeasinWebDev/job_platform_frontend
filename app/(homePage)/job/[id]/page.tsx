import { getMe } from "@/app/services/auth/auth";
import JobDetailsPage from "@/components/home/JobDetailsPage";

export default async function JobDetails({ params }: { params: { id: string } }) {
  const { id } = await params;
   const user = await getMe()

  return (
    <>
      <JobDetailsPage id={id} user={user} />
    </>
  );
}
