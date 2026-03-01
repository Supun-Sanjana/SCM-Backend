"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const healthCheck = async (_, res) => {
    return res.status(200).json({ status: 201 });
};
exports.healthCheck = healthCheck;
