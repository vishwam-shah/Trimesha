import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Service from "@/models/Service";
import { ensureDefaultServices } from "@/lib/ensure-services";
import { serializeServiceDoc } from "@/lib/service-serialize";
import { ServiceDetailClient } from "./service-detail-client";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await ensureDefaultServices();
  const doc = await Service.findOne({ slug }).select("title description").lean();
  if (!doc) {
    return { title: "Service | Trimesha" };
  }
  return {
    title: `${doc.title} | Trimesha`,
    description: doc.description,
  };
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  await ensureDefaultServices();
  const doc = await Service.findOne({ slug }).lean();
  if (!doc) {
    notFound();
  }
  const service = serializeServiceDoc(doc);
  return <ServiceDetailClient service={service} />;
}
