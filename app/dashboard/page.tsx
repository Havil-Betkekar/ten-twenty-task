import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TimesheetTable from "@/components/TimesheetTable";

import { User } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  const user: User = {
    id: session.user?.id ?? "1",
    name: session.user?.name ?? "User",
    email: session.user?.email ?? "",
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar user={user} />

      {/* Main content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        <TimesheetTable />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
