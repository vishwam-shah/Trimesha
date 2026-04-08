import mongoose, { Schema, model, models } from "mongoose";
import type { Service } from "@/types/service";

export interface IService extends Service {
  _id?: mongoose.Types.ObjectId;
}

const ServiceSchema = new Schema<IService>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    color: { type: String, default: "#1e3a5f" },
    overview: { type: String, default: "" },
    deliverables: { type: [String], default: [] },
    goodFor: { type: [String], default: [] },
    typicalTimeline: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const ServiceModel =
  models.Service ?? model<IService>("Service", ServiceSchema);

export default ServiceModel;

