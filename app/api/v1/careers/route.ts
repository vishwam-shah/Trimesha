import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconnect";
import CareerJob from "@/models/CareerJob";
import { DEFAULT_CAREER_JOBS } from "@/lib/default-careers";
import type { CareerJobWithId } from "@/types/career-job";

function serialize(doc: {
  _id: unknown;
  title: string;
  type: string;
  experience: string;
  compensation?: string;
  description: string;
  benefits: string[];
  tags: string[];
  sortOrder: number;
}): CareerJobWithId {
  return {
    id: String(doc._id),
    title: doc.title,
    type: doc.type,
    experience: doc.experience,
    compensation: doc.compensation ?? "",
    description: doc.description,
    benefits: doc.benefits ?? [],
    tags: doc.tags ?? [],
    sortOrder: doc.sortOrder,
  };
}

export async function GET() {
  try {
    await connect();
    let list = await CareerJob.find().sort({ sortOrder: 1 }).lean();

    if (list.length === 0) {
      await CareerJob.insertMany(
        DEFAULT_CAREER_JOBS.map((j, i) => ({ ...j, sortOrder: i })),
      );
      list = await CareerJob.find().sort({ sortOrder: 1 }).lean();
    }

    const jobs: CareerJobWithId[] = list.map((d) => serialize(d));
    return NextResponse.json(jobs);
  } catch (e) {
    console.error("GET /api/v1/careers", e);
    return NextResponse.json(
      { error: "Failed to load careers" },
      { status: 500 },
    );
  }
}
