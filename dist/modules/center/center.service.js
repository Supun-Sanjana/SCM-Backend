"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCenterService = exports.updateCenterService = exports.getCenterByIdService = exports.getAllCentersService = exports.createCenterService = void 0;
const center_model_1 = __importDefault(require("./center.model"));
// create center
const createCenterService = async (data) => {
    try {
        const res = await center_model_1.default.create({
            centerName: data.centerName,
            centerLocation: data.centerLocation,
            capacity: data.capacity ?? 0,
            feePerMonth: data.feePerMonth ?? 0,
            status: data.status ?? 'Active',
        });
        return res;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.createCenterService = createCenterService;
// get all centers
const getAllCentersService = async () => {
    try {
        const centers = await center_model_1.default.find().populate("grades");
        return centers;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getAllCentersService = getAllCentersService;
// get center by id
const getCenterByIdService = async (centerId) => {
    try {
        const center = await center_model_1.default.findById(centerId).populate("grades");
        if (!center)
            throw new Error("CENTER_NOT_FOUND");
        return center;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getCenterByIdService = getCenterByIdService;
// update center by id
const updateCenterService = async (centerId, data) => {
    try {
        const updated = await center_model_1.default.findByIdAndUpdate(centerId, data, { returnDocument: 'after' });
        if (!updated)
            throw new Error("CENTER_NOT_FOUND");
        return updated;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.updateCenterService = updateCenterService;
// delete center by id
const deleteCenterService = async (centerId) => {
    try {
        const deleted = await center_model_1.default.findByIdAndDelete(centerId);
        if (!deleted)
            throw new Error("CENTER_NOT_FOUND");
        return deleted;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.deleteCenterService = deleteCenterService;
