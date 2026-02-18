import { Request, Response } from "express";
import { createGradeService, getGradesByCenterService } from "./grade.service";

//create grade
export const createGradeController = async (req: Request, res: Response) => {
  const data = req.body;
  const { centerId } = req.params;
  try {
    const response = await createGradeService(String(centerId), data);
    return res.status(201).json({ message: "grade saved", response });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

//get grades by center
export const getGradesByCenterController = async (
  req: Request,
  res: Response,
) => {
  const { centerId } = req.params;
  try {
    const grade = await getGradesByCenterService(centerId);
    return res.status(200).json({ grade });
  } catch (error: any) {
    throw new Error(error);
  }
};
