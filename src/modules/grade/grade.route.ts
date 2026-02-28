import { Router } from "express";
import {
    createGradeController,
    deleteGradeController,
    getGradeByIdController,
    getGradesByCenterController,
    updateGradeController,
} from "./grade.controller";

const gradeRouter = Router();

gradeRouter.post("/:centerId", createGradeController);
gradeRouter.get("/center/:centerId", getGradesByCenterController);
gradeRouter.get("/:gradeId", getGradeByIdController);
gradeRouter.patch("/:gradeId", updateGradeController);
gradeRouter.delete("/:gradeId", deleteGradeController);

export default gradeRouter;