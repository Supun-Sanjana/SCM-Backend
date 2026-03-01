"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTestTemplateController = exports.addTestTemplateController = exports.deleteGradeController = exports.updateGradeController = exports.getGradeByIdController = exports.getGradesByCenterController = exports.createGradeController = void 0;
const grade_service_1 = require("./grade.service");
// create grade
const createGradeController = async (req, res) => {
    const data = req.body;
    const { centerId } = req.params;
    try {
        const response = await (0, grade_service_1.createGradeService)(String(centerId), data);
        return res.status(201).json({ message: "grade saved", response });
    }
    catch (error) {
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.createGradeController = createGradeController;
// get grades by center
const getGradesByCenterController = async (req, res) => {
    const { centerId } = req.params;
    try {
        const grades = await (0, grade_service_1.getGradesByCenterService)(String(centerId));
        return res.status(200).json({ grades });
    }
    catch (error) {
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.getGradesByCenterController = getGradesByCenterController;
// get grade by id
const getGradeByIdController = async (req, res) => {
    const { gradeId } = req.params;
    try {
        const grade = await (0, grade_service_1.getGradeByIdService)(String(gradeId));
        return res.status(200).json({ grade });
    }
    catch (error) {
        if (error.message === "GRADE_NOT_FOUND") {
            return res.status(404).json({ message: "Grade not found" });
        }
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.getGradeByIdController = getGradeByIdController;
// update grade
const updateGradeController = async (req, res) => {
    const { gradeId } = req.params;
    const data = req.body;
    try {
        const grade = await (0, grade_service_1.updateGradeService)(String(gradeId), data);
        return res.status(200).json({ message: "grade updated", grade });
    }
    catch (error) {
        if (error.message === "GRADE_NOT_FOUND") {
            return res.status(404).json({ message: "Grade not found" });
        }
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.updateGradeController = updateGradeController;
// delete grade
const deleteGradeController = async (req, res) => {
    const { gradeId } = req.params;
    try {
        const grade = await (0, grade_service_1.deleteGradeService)(String(gradeId));
        return res.status(200).json({ message: "grade deleted", grade });
    }
    catch (error) {
        if (error.message === "GRADE_NOT_FOUND") {
            return res.status(404).json({ message: "Grade not found" });
        }
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.deleteGradeController = deleteGradeController;
// add test template to grade
const addTestTemplateController = async (req, res) => {
    const { gradeId } = req.params;
    const { title, totalMarks } = req.body;
    try {
        const grade = await (0, grade_service_1.addTestTemplateService)(String(gradeId), { title, totalMarks: totalMarks ?? 100 });
        return res.status(200).json({ message: "template added", grade });
    }
    catch (error) {
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.addTestTemplateController = addTestTemplateController;
// remove test template from grade
const removeTestTemplateController = async (req, res) => {
    const { gradeId, templateId } = req.params;
    try {
        const grade = await (0, grade_service_1.removeTestTemplateService)(String(gradeId), String(templateId));
        return res.status(200).json({ message: "template removed", grade });
    }
    catch (error) {
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.removeTestTemplateController = removeTestTemplateController;
