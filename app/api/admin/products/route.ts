import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconnect";
import Product from "@/models/Product";
import { requireAdminAccess } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const session = await requireAdminAccess();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const place = String(body.place ?? "");
    const title = String(body.title ?? "");
    const title2 = String(body.title2 ?? "");
    const description = String(body.description ?? "");
    const image = String(body.image ?? "");
    const url = String(body.url ?? "");
    const category = String(body.category ?? "");
    const features = Array.isArray(body.features)
      ? body.features.map(String)
      : String(body.features ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

    await connect();
    const max = await Product.findOne().sort({ sortOrder: -1 }).select("sortOrder").lean();
    const sortOrder = typeof max?.sortOrder === "number" ? max.sortOrder + 1 : 0;

    const doc = await Product.create({
      place,
      title,
      title2,
      description,
      image,
      url,
      category,
      features,
      sortOrder,
    });

    return NextResponse.json({ id: String(doc._id) }, { status: 201 });
  } catch (e) {
    console.error("POST /api/admin/products", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
