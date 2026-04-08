import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconnect";
import Service from "@/models/Service";
import { requireAdminAccess } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const session = await requireAdminAccess();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const slug = String(body.slug ?? "");
    const title = String(body.title ?? "");
    const description = String(body.description ?? "");
    const image = String(body.image ?? "");
    const color = String(body.color ?? "#1e3a5f");
    const overview = String(body.overview ?? "");
    const deliverables = Array.isArray(body.deliverables)
      ? body.deliverables.map(String)
      : String(body.deliverables ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
    const goodFor = Array.isArray(body.goodFor)
      ? body.goodFor.map(String)
      : String(body.goodFor ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
    const typicalTimeline = String(body.typicalTimeline ?? "");

    await connect();
    const max = await Service.findOne()
      .sort({ sortOrder: -1 })
      .select("sortOrder")
      .lean();
    const sortOrder =
      typeof max?.sortOrder === "number" ? max.sortOrder + 1 : 0;

    const doc = await Service.create({
      slug,
      title,
      description,
      image,
      color,
      overview,
      deliverables,
      goodFor,
      typicalTimeline,
      sortOrder,
    });

    return NextResponse.json({ id: String(doc._id) }, { status: 201 });
  } catch (e) {
    console.error("POST /api/v1/admin/services", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

