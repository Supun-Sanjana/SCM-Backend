"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentService = exports.updateStudentService = exports.getStudentByIdService = exports.getAllStudentsService = exports.createStudentService = void 0;
const student_model_1 = __importDefault(require("./student.model"));
const createStudentService = async (data, gradeId) => {
    try {
        const res = await student_model_1.default.create({
            firstName: data.firstName,
            lastName: data.lastname,
            whatsappNumber: data.whatsappNumber,
            parentContactNumber: data.parentContactNumber,
            grade: gradeId,
        });
        return res;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.createStudentService = createStudentService;
const getAllStudentsService = async () => {
    try {
        const students = await student_model_1.default.find();
        return students;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAllStudentsService = getAllStudentsService;
const getStudentByIdService = async (studentId) => {
    try {
        const student = await student_model_1.default.findById(studentId).populate({
            path: "grade", // first populate the grade
            populate: {
                path: "centerId", // then populate the center inside grade
                model: "Center", // specify the model explicitly
            },
        });
        return student;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getStudentByIdService = getStudentByIdService;
const updateStudentService = async (studentId, studentData) => {
    const updatedStudent = await student_model_1.default.findByIdAndUpdate(studentId, studentData, { returnDocument: 'after' }).populate({
        path: "grade",
        populate: { path: "centerId", model: "Center" },
    });
    return updatedStudent;
};
exports.updateStudentService = updateStudentService;
const deleteStudentService = async (studentId) => {
    const deletedStudent = await student_model_1.default.findByIdAndDelete(studentId);
    return deletedStudent;
};
exports.deleteStudentService = deleteStudentService;
