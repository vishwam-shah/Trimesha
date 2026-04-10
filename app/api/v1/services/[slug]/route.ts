import { NextResponse } from "next/server";
import Service from "@/models/Service";
import { ensureDefaultServices } from "@/lib/ensure-services";
import { serializeServiceDoc } from "@/lib/service-serialize";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await ensureDefaultServices();
    const doc = await Service.findOne({ slug }).lean();

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(serializeServiceDoc(doc));
  } catch (e) {
    console.error("GET /api/v1/services/[slug]", e);
    return NextResponse.json(
      { error: "Failed to load service" },
      { status: 500 },
    );
  }
}
