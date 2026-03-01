"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCenterController = exports.updateCenterController = exports.getCenterByIdController = exports.getAllCentersController = exports.createCenterController = void 0;
const center_service_1 = require("./center.service");
// create center
const createCenterController = async (req, res) => {
    const data = req.body;
    try {
        const response = await (0, center_service_1.createCenterService)(data);
        return res.status(201).json({ message: "center saved", response });
    }
    catch (error) {
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.createCenterController = createCenterController;
// get all centers
const getAllCentersController = async (_, res) => {
    try {
        const centers = await (0, center_service_1.getAllCentersService)();
        return res.status(200).json({ centers });
    }
    catch (error) {
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.getAllCentersController = getAllCentersController;
// get center by id
const getCenterByIdController = async (req, res) => {
    const { centerId } = req.params;
    try {
        const center = await (0, center_service_1.getCenterByIdService)(centerId);
        return res.status(200).json({ center });
    }
    catch (error) {
        if (error.message === "CENTER_NOT_FOUND") {
            return res.status(404).json({ message: "Center not found" });
        }
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.getCenterByIdController = getCenterByIdController;
// update center
const updateCenterController = async (req, res) => {
    const { centerId } = req.params;
    const data = req.body;
    try {
        const center = await (0, center_service_1.updateCenterService)(centerId, data);
        return res.status(200).json({ message: "center updated", center });
    }
    catch (error) {
        if (error.message === "CENTER_NOT_FOUND") {
            return res.status(404).json({ message: "Center not found" });
        }
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.updateCenterController = updateCenterController;
// delete center
const deleteCenterController = async (req, res) => {
    const { centerId } = req.params;
    try {
        const center = await (0, center_service_1.deleteCenterService)(centerId);
        return res.status(200).json({ message: "center deleted", center });
    }
    catch (error) {
        if (error.message === "CENTER_NOT_FOUND") {
            return res.status(404).json({ message: "Center not found" });
        }
        return res.status(500).json({ message: "something went wrong", error });
    }
};
exports.deleteCenterController = deleteCenterController;
