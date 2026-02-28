import { Router } from "express";
import {
    deleteUserByIdController,
    getAllUsersController,
    getUserByIdController,
    loginController,
    registerController,
    saveUserController,
    updateUserController,
} from "./user.controller";

const userRoute = Router();

// ── Auth (public) ──────────────────────────────────────────────────────────────
userRoute.post("/register", registerController);
userRoute.post("/login", loginController);

// ── CRUD ───────────────────────────────────────────────────────────────────────
userRoute.post("/", saveUserController);
userRoute.get("/", getAllUsersController);
userRoute.get("/:id", getUserByIdController);
userRoute.put("/:id", updateUserController);
userRoute.delete("/:id", deleteUserByIdController);

export default userRoute;
