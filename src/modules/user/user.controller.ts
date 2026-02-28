import { Request, Response } from "express";
import {
  deleteUserByIdService,
  getAllUsersService,
  getUserByIdService,
  loginUserService,
  registerUserService,
  saveUserService,
  updateUserService,
} from "./user.service";

// ─── Auth Controllers ─────────────────────────────────────────────────────────

// POST /api/v1/user/register
export const registerController = async (req: Request, res: Response) => {
  try {
    const result = await registerUserService(req.body);
    return res.status(201).json({ message: "Registration successful", ...result });
  } catch (error: any) {
    if (error.message === "EMAIL_EXISTS") {
      return res.status(409).json({ message: "Email already in use" });
    }
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// POST /api/v1/user/login
export const loginController = async (req: Request, res: Response) => {
  try {
    const result = await loginUserService(req.body);
    return res.status(200).json({ message: "Login successful", ...result });
  } catch (error: any) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// ─── CRUD Controllers ─────────────────────────────────────────────────────────

export const saveUserController = async (req: Request, res: Response) => {
  const response = await saveUserService(req.body);
  return res.status(201).json({ message: "user saved!", response });
};

export const getAllUsersController = async (_: Request, res: Response) => {
  const data = await getAllUsersService();
  return res.status(200).json({ message: "fetch success", data });
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(req.params.id as string);
    return res.status(200).json(user);
  } catch (error: any) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUser = await updateUserService(id, req.body);
  return res.status(200).json({ message: "user updated", updatedUser });
};

export const deleteUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteUserByIdService(id);
  return res.status(200).json({ message: "user deleted" });
};
