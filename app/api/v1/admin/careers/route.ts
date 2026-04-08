import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconnect";
import CareerJob from "@/models/CareerJob";
import { requireAdminAccess } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const session = await requireAdminAccess();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const title = String(body.title ?? "");
    const type = String(body.type ?? "");
    const experience = String(body.experience ?? "");
    const compensation =
      body.compensation !== undefined ? String(body.compensation) : "";
    const description = String(body.description ?? "");
    const benefits = Array.isArray(body.benefits)
      ? body.benefits.map(String)
      : String(body.benefits ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
    const tags = Array.isArray(body.tags)
      ? body.tags.map(String)
      : String(body.tags ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

    await connect();
    const max = await CareerJob.findOne()
      .sort({ sortOrder: -1 })
      .select("sortOrder")
      .lean();
    const sortOrder =
      typeof max?.sortOrder === "number" ? max.sortOrder + 1 : 0;

    const doc = await CareerJob.create({
      title,
      type,
      experience,
      compensation,
      description,
      benefits,
      tags,
      sortOrder,
    });

    return NextResponse.json({ id: String(doc._id) }, { status: 201 });
  } catch (e) {
    console.error("POST /api/v1/admin/careers", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
