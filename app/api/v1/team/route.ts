import { NextResponse } from "next/server";
import { getPublicTeamMembers } from "@/lib/team-public";

export async function GET() {
  try {
    const members = await getPublicTeamMembers();
    return NextResponse.json(members);
  } catch (e) {
    console.error("GET /api/v1/team", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
