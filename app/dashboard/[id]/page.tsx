// app/dashboard/[id]/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import WeekDetailView from "@/components/WeekDetailView";
import { User } from "@/lib/types";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WeekDetailPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect("/login");

  const { id } = await params;

  const user: User = {
    id: session.user?.id ?? "1",
    name: session.user?.name ?? "User",
    email: session.user?.email ?? "",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 mt-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <WeekDetailView timesheetId={id} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
