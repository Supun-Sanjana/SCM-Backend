"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByIdService = exports.updateUserService = exports.getUserByIdService = exports.getAllUsersService = exports.saveUserService = exports.loginUserService = exports.registerUserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("./user.model"));
const JWT_SECRET = process.env.JWT_SECRET || "scm_secret_key_change_in_prod";
const JWT_EXPIRES = "7d";
// ─── Auth Services ────────────────────────────────────────────────────────────
const registerUserService = async (data) => {
    const { firstName, lastName, email, password, role } = data;
    // Check if email already exists
    const existing = await user_model_1.default.findOne({ email });
    if (existing)
        throw new Error("EMAIL_EXISTS");
    // Hash password
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await user_model_1.default.create({
        firstName,
        lastName,
        email,
        password: hashed,
        role: role ?? "teacher",
    });
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return {
        token,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        },
    };
};
exports.registerUserService = registerUserService;
const loginUserService = async (data) => {
    const { email, password } = data;
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        throw new Error("INVALID_CREDENTIALS");
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        throw new Error("INVALID_CREDENTIALS");
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return {
        token,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        },
    };
};
exports.loginUserService = loginUserService;
// ─── Existing CRUD Services ───────────────────────────────────────────────────
const saveUserService = async (data) => {
    const { firstName, lastName, email, password } = data;
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const res = await user_model_1.default.create({ firstName, lastName, email, password: hashed });
    return res;
};
exports.saveUserService = saveUserService;
const getAllUsersService = async () => {
    const users = await user_model_1.default.find().select("-password");
    return users;
};
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = async (id) => {
    const user = await user_model_1.default.findById(id).select("-password");
    if (!user)
        throw new Error("USER_NOT_FOUND");
    return user;
};
exports.getUserByIdService = getUserByIdService;
const updateUserService = async (id, data) => {
    const update = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
    };
    if (data.password) {
        update.password = await bcryptjs_1.default.hash(data.password, 10);
    }
    const res = await user_model_1.default.findOneAndUpdate({ _id: id }, update, { returnDocument: 'after' }).select("-password");
    return res;
};
exports.updateUserService = updateUserService;
const deleteUserByIdService = async (id) => {
    const res = user_model_1.default.deleteOne({ _id: id });
    return res;
};
exports.deleteUserByIdService = deleteUserByIdService;
