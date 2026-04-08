import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconnect";
import Service from "@/models/Service";
import { DEFAULT_SERVICES } from "@/lib/default-services";
import type { ServiceWithId } from "@/types/service";

function serialize(doc: {
  _id: unknown;
  slug: string;
  title: string;
  description: string;
  image: string;
  color: string;
  overview: string;
  deliverables: string[];
  goodFor: string[];
  typicalTimeline: string;
  sortOrder: number;
}): ServiceWithId {
  return {
    id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    image: doc.image,
    color: doc.color,
    overview: doc.overview,
    deliverables: doc.deliverables ?? [],
    goodFor: doc.goodFor ?? [],
    typicalTimeline: doc.typicalTimeline,
    sortOrder: doc.sortOrder,
  };
}

export async function GET() {
  try {
    await connect();
    let list = await Service.find().sort({ sortOrder: 1 }).lean();

    if (list.length === 0) {
      await Service.insertMany(
        DEFAULT_SERVICES.map((s, i) => ({ ...s, sortOrder: i })),
      );
      list = await Service.find().sort({ sortOrder: 1 }).lean();
    }

    const services: ServiceWithId[] = list.map((d) => serialize(d));
    return NextResponse.json(services);
  } catch (e) {
    console.error("GET /api/v1/services", e);
    return NextResponse.json(
      { error: "Failed to load services" },
      { status: 500 },
    );
  }
}

