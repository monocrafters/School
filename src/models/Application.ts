import mongoose, { Schema, models, model } from "mongoose";
import { APPLICATION_STATUSES } from "@/lib/constants";

const ApplicationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    qualification: { type: String, required: true },
    subjects: { type: [String], required: true },
    cvFileName: { type: String },
    cvData: { type: String },
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
