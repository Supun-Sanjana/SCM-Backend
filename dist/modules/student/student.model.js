"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Grade",
        required: true,
    },
});
const Student = mongoose_1.default.model("Student", studentSchema);
exports.default = Student;
