"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRoute = (0, express_1.Router)();
// ── Auth (public) ──────────────────────────────────────────────────────────────
userRoute.post("/register", user_controller_1.registerController);
userRoute.post("/login", user_controller_1.loginController);
// ── CRUD ───────────────────────────────────────────────────────────────────────
userRoute.post("/", user_controller_1.saveUserController);
userRoute.get("/", user_controller_1.getAllUsersController);
userRoute.get("/:id", user_controller_1.getUserByIdController);
userRoute.put("/:id", user_controller_1.updateUserController);
userRoute.delete("/:id", user_controller_1.deleteUserByIdController);
exports.default = userRoute;
