// models/Visit.ts
import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  count: { type: Number, default: 0 },
});

export default mongoose.models.Visit || mongoose.model("Visit", VisitSchema);
