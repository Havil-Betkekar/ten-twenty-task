import { auth } from "@/auth";
import { mockTimesheets } from "@/lib/mockData";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const timesheet = mockTimesheets.find((t) => t.id === id);

  if (!timesheet) {
    return NextResponse.json({ error: "Timesheet not found" }, { status: 404 });
  }

  return NextResponse.json({
    data: timesheet,
  });
}
