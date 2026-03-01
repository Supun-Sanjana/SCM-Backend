import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./user.model";

const JWT_SECRET = process.env.JWT_SECRET || "scm_secret_key_change_in_prod";
const JWT_EXPIRES = "7d";

// ─── Auth Services ────────────────────────────────────────────────────────────

export const registerUserService = async (data: {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const { firstName, lastName, email, password, role } = data;

  console.log(firstName,lastName);
  
  // Check if email already exists
  const existing = await User.findOne({ email });
  if (existing) throw new Error("EMAIL_EXISTS");

  // Hash password
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashed,
    role: role ?? "teacher",
  });

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

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

export const loginUserService = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const match = await bcrypt.compare(password, user.password as string);
  if (!match) throw new Error("INVALID_CREDENTIALS");

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

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

// ─── Existing CRUD Services ───────────────────────────────────────────────────

export const saveUserService = async (data: any) => {
  const { firstName, lastName, email, password } = data;
  const hashed = await bcrypt.hash(password, 10);
  const res = await User.create({ firstName, lastName, email, password: hashed });
  return res;
};

export const getAllUsersService = async () => {
  const users = await User.find().select("-password");
  return users;
};

export const getUserByIdService = async (id: string) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("USER_NOT_FOUND");
  return user;
};

export const updateUserService = async (id: string | string[], data: any) => {
  const update: any = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
  };
  if (data.password) {
    update.password = await bcrypt.hash(data.password, 10);
  }
  const res = await User.findOneAndUpdate({ _id: id }, update, { returnDocument: 'after' }).select("-password");
  return res;
};

export const deleteUserByIdService = async (id: string | string[]) => {
  const res = User.deleteOne({ _id: id });
  return res;
};
