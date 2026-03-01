"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gradeSchema = new mongoose_1.default.Schema({
    centerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Center", required: true },
    grade: { type: String, required: true },
    fee: { type: Number, required: true },
    schedule: [{ type: Date }],
    available: { type: Boolean, default: true },
    students: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Student" }],
    testTemplates: [
        {
            title: { type: String, required: true },
            totalMarks: { type: Number, default: 100 },
        },
    ],
});
const Grade = mongoose_1.default.model("Grade", gradeSchema);
exports.default = Grade;
