import { Router } from "express";
import {
    addTestTemplateController,
    createGradeController,
    deleteGradeController,
    getGradeByIdController,
    getGradesByCenterController,
    removeTestTemplateController,
    updateGradeController,
} from "./grade.controller";

const gradeRouter = Router();

gradeRouter.post("/:centerId", createGradeController);
gradeRouter.get("/center/:centerId", getGradesByCenterController);
gradeRouter.get("/:gradeId", getGradeByIdController);
gradeRouter.patch("/:gradeId", updateGradeController);
gradeRouter.delete("/:gradeId", deleteGradeController);
gradeRouter.post("/:gradeId/test-template", addTestTemplateController);
gradeRouter.delete("/:gradeId/test-template/:templateId", removeTestTemplateController);

export default gradeRouter;