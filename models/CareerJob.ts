import mongoose, { Schema, model, models } from "mongoose";
import type { CareerJob } from "@/types/career-job";

export interface ICareerJob extends CareerJob {
  _id?: mongoose.Types.ObjectId;
}

const CareerJobSchema = new Schema<ICareerJob>(
  {
    title: { type: String, required: true, default: "" },
    type: { type: String, default: "" },
    experience: { type: String, default: "" },
    compensation: { type: String, default: "" },
    description: { type: String, default: "" },
    benefits: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const CareerJob =
  models.CareerJob ?? model<ICareerJob>("CareerJob", CareerJobSchema);

export default CareerJob;
