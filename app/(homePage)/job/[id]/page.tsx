import JobDetailsPage from "@/components/home/JobDetailsPage";

export default async function JobDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <JobDetailsPage id={id} />
    </>
  );
}
