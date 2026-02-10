import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentNo: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  attendance: [
    {
      date: {
        type: Date,
        required: true,
      },
      present: {
        type: Boolean,
        required: true,
      },
    },
  ],
  tests: [
    {
      title: {
        type: String,
      },
      marks: {
        type: String,
      },
      grade: {
        type: String,
      },
    },
  ],

  payment: [
    {
      date: {
        type: Date,
        required: true,
      },
      status: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
  ],
});

const Student = mongoose.model("student", studentSchema)
export default Student