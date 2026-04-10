import { NextResponse } from "next/server";
import Service from "@/models/Service";
import { ensureDefaultServices } from "@/lib/ensure-services";
import { serializeServiceDoc } from "@/lib/service-serialize";

export async function GET() {
  try {
    await ensureDefaultServices();
    const list = await Service.find().sort({ sortOrder: 1 }).lean();

    const services = list.map((d) => serializeServiceDoc(d));
    return NextResponse.json(services);
  } catch (e) {
    console.error("GET /api/v1/services", e);
    return NextResponse.json(
      { error: "Failed to load services" },
      { status: 500 },
    );
  }
}

