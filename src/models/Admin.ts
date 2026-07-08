import mongoose, { Schema, models, model } from "mongoose";

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

export default models.Admin || model("Admin", AdminSchema);
