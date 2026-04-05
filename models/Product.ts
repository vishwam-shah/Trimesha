import mongoose, { Schema, model, models } from "mongoose";
import type { ProductSlide } from "@/types/product";

export interface IProduct extends ProductSlide {
  sortOrder: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    place: { type: String, default: "" },
    title: { type: String, default: "" },
    title2: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    url: { type: String, default: "" },
    category: { type: String, default: "" },
    features: { type: [String], default: [] },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Product = models.Product ?? model<IProduct>("Product", ProductSchema);

export default Product;
