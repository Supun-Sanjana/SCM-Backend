import { Router } from "express";
import { createStudentController, deleteStudentController, getAllStudentsController, getStudentByIdController, updateStudentController } from "./student.controller";

const studentRouter = Router();

studentRouter.post("/:gradeId", createStudentController);
studentRouter.get("/", getAllStudentsController);
studentRouter.get("/:studentId", getStudentByIdController);
studentRouter.patch("/:studentId", updateStudentController);
studentRouter.delete("/:studentId", deleteStudentController);

export default studentRouter