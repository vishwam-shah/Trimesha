import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconnect";
import Product from "@/models/Product";
import { DEFAULT_PRODUCT_SLIDES } from "@/lib/default-products";
import type { ProductSlideWithId } from "@/types/product";

function serialize(
  doc: {
    _id: unknown;
    place: string;
    title: string;
    title2: string;
    description: string;
    image: string;
    url: string;
    category: string;
    features: string[];
    sortOrder: number;
  },
): ProductSlideWithId {
  return {
    id: String(doc._id),
    place: doc.place,
    title: doc.title,
    title2: doc.title2,
    description: doc.description,
    image: doc.image,
    url: doc.url,
    category: doc.category,
    features: doc.features ?? [],
  };
}

export async function GET() {
  try {
    await connect();
    let list = await Product.find().sort({ sortOrder: 1 }).lean();

    if (list.length === 0) {
      await Product.insertMany(
        DEFAULT_PRODUCT_SLIDES.map((p, i) => ({ ...p, sortOrder: i })),
      );
      list = await Product.find().sort({ sortOrder: 1 }).lean();
    }

    const products: ProductSlideWithId[] = list.map((d) => serialize(d));
    return NextResponse.json(products);
  } catch (e) {
    console.error("GET /api/v1/products", e);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 },
    );
  }
}
