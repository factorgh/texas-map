// drill.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IDrill extends Document {
  title: string;
  description: string;
  lng: string;
  lat: string;
  category: string;
}

const drillSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  lng: { type: Number, required: true },
  lat: { type: Number, required: true },
  category: { type: String, required: true },
});

const Drill =
  mongoose.models.Drill || mongoose.model<IDrill>("Drill", drillSchema);
export default Drill;
