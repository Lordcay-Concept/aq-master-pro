import mongoose from "mongoose";

const breakSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  duration: { type: Number, default: 15 },
  actualDuration: { type: Number },
  reason: { type: String },
  status: { type: String, enum: ["active", "completed", "cancelled"], default: "active" }
}, { timestamps: true });

export default mongoose.models.Break || mongoose.model("Break", breakSchema);