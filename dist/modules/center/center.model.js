"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const centerSchema = new mongoose_1.default.Schema({
    centerName: { type: String },
    centerLocation: { type: String },
    capacity: { type: Number, default: 0 },
    feePerMonth: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Pending', 'Inactive'], default: 'Active' },
    grades: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Grade" }],
});
const Center = mongoose_1.default.model("Center", centerSchema);
exports.default = Center;
