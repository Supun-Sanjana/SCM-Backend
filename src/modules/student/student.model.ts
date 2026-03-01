import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentNo: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String },
  address: { type: String },
  whatsappNumber: { type: String },
  parentContactNumber: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  attendance: [
    {
      date: { type: Date, required: true },
      present: { type: Boolean, required: true },
    },
  ],
  tests: [
    {
      title: { type: String },
      marks: { type: String },
      grade: { type: String },
    },
  ],
  payment: [
    {
      date: { type: Date, required: true },
      status: { type: Boolean, default: false, required: true },
      amount: { type: Number },
    },
  ],
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
