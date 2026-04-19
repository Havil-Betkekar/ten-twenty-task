import { auth } from "@/auth";
import { mockTimesheets } from "@/lib/mockData";
import { Timesheet, TimesheetStatus } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const status = searchParams.get("status") as TimesheetStatus | "all" | null;

  let filtered: Timesheet[] = mockTimesheets;

  //date range filter
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    filtered = filtered.filter((timesheet) => {
      const weekStart = new Date(timesheet.startDate);
      const weekEnd = new Date(timesheet.endDate);

      return weekStart <= end && weekEnd >= start;
    });
  }

  // apply status filter
  if (status && status !== "all") {
    filtered = filtered.filter((timesheet) => timesheet.status === status);
  }

  return NextResponse.json({
    data: filtered,
  });
}
