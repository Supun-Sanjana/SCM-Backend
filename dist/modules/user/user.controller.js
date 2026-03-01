"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByIdController = exports.updateUserController = exports.getUserByIdController = exports.getAllUsersController = exports.saveUserController = exports.loginController = exports.registerController = void 0;
const user_service_1 = require("./user.service");
// ─── Auth Controllers ─────────────────────────────────────────────────────────
// POST /api/v1/user/register
const registerController = async (req, res) => {
    try {
        const result = await (0, user_service_1.registerUserService)(req.body);
        return res.status(201).json({ message: "Registration successful", ...result });
    }
    catch (error) {
        if (error.message === "EMAIL_EXISTS") {
            return res.status(409).json({ message: "Email already in use" });
        }
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
exports.registerController = registerController;
// POST /api/v1/user/login
const loginController = async (req, res) => {
    try {
        const result = await (0, user_service_1.loginUserService)(req.body);
        return res.status(200).json({ message: "Login successful", ...result });
    }
    catch (error) {
        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};
exports.loginController = loginController;
// ─── CRUD Controllers ─────────────────────────────────────────────────────────
const saveUserController = async (req, res) => {
    const response = await (0, user_service_1.saveUserService)(req.body);
    return res.status(201).json({ message: "user saved!", response });
};
exports.saveUserController = saveUserController;
const getAllUsersController = async (_, res) => {
    const data = await (0, user_service_1.getAllUsersService)();
    return res.status(200).json({ message: "fetch success", data });
};
exports.getAllUsersController = getAllUsersController;
const getUserByIdController = async (req, res) => {
    try {
        const user = await (0, user_service_1.getUserByIdService)(req.params.id);
        return res.status(200).json(user);
    }
    catch (error) {
        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserByIdController = getUserByIdController;
const updateUserController = async (req, res) => {
    const { id } = req.params;
    const updatedUser = await (0, user_service_1.updateUserService)(id, req.body);
    return res.status(200).json({ message: "user updated", updatedUser });
};
exports.updateUserController = updateUserController;
const deleteUserByIdController = async (req, res) => {
    const { id } = req.params;
    await (0, user_service_1.deleteUserByIdService)(id);
    return res.status(200).json({ message: "user deleted" });
};
exports.deleteUserByIdController = deleteUserByIdController;
