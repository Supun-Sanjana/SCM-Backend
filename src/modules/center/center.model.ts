import mongoose from "mongoose";

const centerSchema = new mongoose.Schema({
  centerName: { type: String },
  centerLocation: { type: String },
  capacity: { type: Number, default: 0 },
  feePerMonth: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Pending', 'Inactive'], default: 'Active' },
  grades: [{ type: mongoose.Schema.Types.ObjectId, ref: "Grade" }],
});

const Center = mongoose.model("Center", centerSchema);
export default Center;
