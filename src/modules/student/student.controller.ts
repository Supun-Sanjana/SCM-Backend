import { Request, Response } from "express";
import {
  createStudentService,
  deleteStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
} from "./student.service";

interface StudentSchema {
  studentNo: string;
  firstName: string;
  lastname: string;
  grade: string;
  whatsappNumber: string;
  parentContactNumber: string;
}

//create student
export const createStudentController = async (req: Request, res: Response) => {
  const data = req.body;
  const { gradeId } = req.params;
  try {
    if (!gradeId || Array.isArray(gradeId)) {
      return res.status(400).json({ message: "Invalid gradeId" });
    }
    const result = await createStudentService(data, gradeId);
    return res.status(201).json({ message: "student created", result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//get all students
export const getAllStudentsController = async (_: Request, res: Response) => {
  try {
    const students = await getAllStudentsService();
    return res.status(200).json({ students });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//get student by id
export const getStudentByIdController = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  try {
    const student = await getStudentByIdService(studentId);
    return res.status(200).json({ student });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
};

//update student
export const updateStudentController = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const studentData: StudentSchema = req.body;

  try {
    const student = await updateStudentService(studentId, studentData);
    return res.status(200).json({ student });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error });
  }
};

//delete student
export const deleteStudentController = async (req: Request, res: Response) => {
  const { studentId } = req.params;
 
  try {
    const student = await deleteStudentService(studentId);
    return res.status(200).json({ student });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || error });
  }
};
