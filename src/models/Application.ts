import mongoose, { Schema, models, model } from "mongoose";
import { APPLICATION_STATUSES } from "@/lib/constants";

const ApplicationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    qualification: { type: String, required: true },
    professionalQualification: { type: String },
    subjects: { type: [String], required: true },
    cvFileName: { type: String, required: true },
    cvData: { type: String, required: true },
    status: {
      type: String,
      enum: APPLICATION_STATUSES,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default models.Application ||
  model("Application", ApplicationSchema);
