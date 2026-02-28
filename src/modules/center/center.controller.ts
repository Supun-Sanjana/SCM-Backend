import { Request, Response } from "express";
import {
  createCenterService,
  deleteCenterService,
  getAllCentersService,
  getCenterByIdService,
  updateCenterService,
} from "./center.service";

// create center
export const createCenterController = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const response = await createCenterService(data);
    return res.status(201).json({ message: "center saved", response });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

// get all centers
export const getAllCentersController = async (_: Request, res: Response) => {
  try {
    const centers = await getAllCentersService();
    return res.status(200).json({ centers });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong", error });
  }
};

// get center by id
export const getCenterByIdController = async (req: Request, res: Response) => {
  const { centerId } = req.params as { centerId: string };
  try {
    const center = await getCenterByIdService(centerId);
    return res.status(200).json({ center });
  } catch (error: any) {
    if (error.message === "CENTER_NOT_FOUND") {
      return res.status(404).json({ message: "Center not found" });
    }
    return res.status(500).json({ message: "something went wrong", error });
  }
};

// update center
export const updateCenterController = async (req: Request, res: Response) => {
  const { centerId } = req.params as { centerId: string };
  const data = req.body;
  try {
    const center = await updateCenterService(centerId, data);
    return res.status(200).json({ message: "center updated", center });
  } catch (error: any) {
    if (error.message === "CENTER_NOT_FOUND") {
      return res.status(404).json({ message: "Center not found" });
    }
    return res.status(500).json({ message: "something went wrong", error });
  }
};

// delete center
export const deleteCenterController = async (req: Request, res: Response) => {
  const { centerId } = req.params as { centerId: string };
  try {
    const center = await deleteCenterService(centerId);
    return res.status(200).json({ message: "center deleted", center });
  } catch (error: any) {
    if (error.message === "CENTER_NOT_FOUND") {
      return res.status(404).json({ message: "Center not found" });
    }
    return res.status(500).json({ message: "something went wrong", error });
  }
};
