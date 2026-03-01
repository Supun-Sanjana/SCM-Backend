"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTestTemplateService = exports.addTestTemplateService = exports.deleteGradeService = exports.updateGradeService = exports.getGradeByIdService = exports.getGradesByCenterService = exports.createGradeService = void 0;
const grade_model_1 = __importDefault(require("./grade.model"));
// create grade
const createGradeService = async (centerId, data) => {
    try {
        const res = await grade_model_1.default.create({
            centerId: centerId,
            available: data.available,
            fee: data.fee,
            grade: data.grade,
            schedule: data.schedule,
            students: data.students,
        });
        return res;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.createGradeService = createGradeService;
// get grades by center
const getGradesByCenterService = async (centerId) => {
    try {
        const grades = await grade_model_1.default.find({ centerId }).populate("students");
        return grades;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getGradesByCenterService = getGradesByCenterService;
// get grade by id
const getGradeByIdService = async (gradeId) => {
    try {
        const grade = await grade_model_1.default.findById(gradeId)
            .populate("students")
            .populate("centerId");
        if (!grade)
            throw new Error("GRADE_NOT_FOUND");
        return grade;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getGradeByIdService = getGradeByIdService;
// update grade by id
const updateGradeService = async (gradeId, data) => {
    try {
        const updated = await grade_model_1.default.findByIdAndUpdate(gradeId, data, { returnDocument: 'after' });
        if (!updated)
            throw new Error("GRADE_NOT_FOUND");
        return updated;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.updateGradeService = updateGradeService;
// delete grade by id
const deleteGradeService = async (gradeId) => {
    try {
        const deleted = await grade_model_1.default.findByIdAndDelete(gradeId);
        if (!deleted)
            throw new Error("GRADE_NOT_FOUND");
        return deleted;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.deleteGradeService = deleteGradeService;
// add test template to grade
const addTestTemplateService = async (gradeId, template) => {
    try {
        const grade = await grade_model_1.default.findByIdAndUpdate(gradeId, { $push: { testTemplates: template } }, { returnDocument: 'after' });
        if (!grade)
            throw new Error("GRADE_NOT_FOUND");
        return grade;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.addTestTemplateService = addTestTemplateService;
// remove test template from grade
const removeTestTemplateService = async (gradeId, templateId) => {
    try {
        const grade = await grade_model_1.default.findByIdAndUpdate(gradeId, { $pull: { testTemplates: { _id: templateId } } }, { returnDocument: 'after' });
        if (!grade)
            throw new Error("GRADE_NOT_FOUND");
        return grade;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.removeTestTemplateService = removeTestTemplateService;
