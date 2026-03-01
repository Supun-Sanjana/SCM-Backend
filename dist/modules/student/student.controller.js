"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentController = exports.updateStudentController = exports.getStudentByIdController = exports.getAllStudentsController = exports.createStudentController = void 0;
const student_service_1 = require("./student.service");
//create student
const createStudentController = async (req, res) => {
    const data = req.body;
    const { gradeId } = req.params;
    try {
        if (!gradeId || Array.isArray(gradeId)) {
            return res.status(400).json({ message: "Invalid gradeId" });
        }
        const result = await (0, student_service_1.createStudentService)(data, gradeId);
        return res.status(201).json({ message: "student created", result });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.createStudentController = createStudentController;
//get all students
const getAllStudentsController = async (_, res) => {
    try {
        const students = await (0, student_service_1.getAllStudentsService)();
        return res.status(200).json({ students });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.getAllStudentsController = getAllStudentsController;
//get student by id
const getStudentByIdController = async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await (0, student_service_1.getStudentByIdService)(studentId);
        return res.status(200).json({ student });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
};
exports.getStudentByIdController = getStudentByIdController;
//update student
const updateStudentController = async (req, res) => {
    const { studentId } = req.params;
    const studentData = req.body;
    try {
        const student = await (0, student_service_1.updateStudentService)(studentId, studentData);
        return res.status(200).json({ student });
    }
    catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};
exports.updateStudentController = updateStudentController;
//delete student
const deleteStudentController = async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await (0, student_service_1.deleteStudentService)(studentId);
        return res.status(200).json({ student });
    }
    catch (error) {
        return res.status(500).json({ error: error.message || error });
    }
};
exports.deleteStudentController = deleteStudentController;
