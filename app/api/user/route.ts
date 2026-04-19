import { auth } from "@/auth";
import { mockUser } from "@/lib/mockData";
import { NextResponse } from "next/server";

export async function GET() {
  // check if user is logged in or not
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    data: mockUser,
  });
}
