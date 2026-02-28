import { Router } from "express";
import {
    createCenterController,
    deleteCenterController,
    getAllCentersController,
    getCenterByIdController,
    updateCenterController,
} from "./center.controller";

const centerRouter = Router();

centerRouter.post("/", createCenterController);
centerRouter.get("/", getAllCentersController);
centerRouter.get("/:centerId", getCenterByIdController);
centerRouter.patch("/:centerId", updateCenterController);
centerRouter.delete("/:centerId", deleteCenterController);

export default centerRouter;