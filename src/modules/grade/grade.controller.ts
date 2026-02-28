import { Request, Response } from "express";
import {
  createGradeService,
  deleteGradeService,
  getGradeByIdService,
  getGradesByCenterService,
  updateGradeService,
} from "./grade.service";

// create grade
export const createGradeController = async (req: Request, res: Response) => {
  const data = req.body;
  const { centerId } = req.params;
  try {
    const response = await createGradeService(String(centerId), data);
    return res.status(201).json({ message: "grade saved", response });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

// get grades by center
export const getGradesByCenterController = async (
  req: Request,
  res: Response
) => {
  const { centerId } = req.params;
  try {
    const grades = await getGradesByCenterService(String(centerId));
    return res.status(200).json({ grades });
  } catch (error: any) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

// get grade by id
export const getGradeByIdController = async (req: Request, res: Response) => {
  const { gradeId } = req.params;
  try {
    const grade = await getGradeByIdService(String(gradeId));
    return res.status(200).json({ grade });
  } catch (error: any) {
    if (error.message === "GRADE_NOT_FOUND") {
      return res.status(404).json({ message: "Grade not found" });
    }
    return res.status(500).json({ message: "something went wrong", error });
  }
};

// update grade
export const updateGradeController = async (req: Request, res: Response) => {
  const { gradeId } = req.params;
  const data = req.body;
  try {
    const grade = await updateGradeService(String(gradeId), data);
    return res.status(200).json({ message: "grade updated", grade });
  } catch (error: any) {
    if (error.message === "GRADE_NOT_FOUND") {
      return res.status(404).json({ message: "Grade not found" });
    }
    return res.status(500).json({ message: "something went wrong", error });
  }
};

// delete grade
export const deleteGradeController = async (req: Request, res: Response) => {
  const { gradeId } = req.params;
  try {
    const grade = await deleteGradeService(String(gradeId));
    return res.status(200).json({ message: "grade deleted", grade });
  } catch (error: any) {
    if (error.message === "GRADE_NOT_FOUND") {
      return res.status(404).json({ message: "Grade not found" });
    }
    return res.status(500).json({ message: "something went wrong", error });
  }
};
