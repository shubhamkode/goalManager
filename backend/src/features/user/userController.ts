import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { prisma } from "../../config/db";
import { RequestHandler } from "express";
import * as yup from "yup";
import createHttpError from "http-errors";

//@desc Register New User
//@route POST /v1/api/auth
//@access Public
const registerUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const registerUserSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const validSchema = registerUserSchema.validateSync(req.body);
  const userExists = await prisma.user.findUnique({
    where: { email: validSchema.email },
  });
  if (userExists) {
    throw createHttpError(400, "User Already Exists");
  }
  const hashedPassword = await bcrypt.hash(validSchema.password, 10);
  const user = await prisma.user.create({
    data: { ...validSchema, password: hashedPassword },
  });
  res
    .status(200)
    .cookie("token", generatetoken(user.id))
    .json({ token: generatetoken(user.id) });
});

//@desc Login an Exisiting User
//@route POST /v1/api/auth/login
//@access Public
const loginUser: RequestHandler = asyncHandler(async (req, res) => {
  const loginUserSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  const validSchema = loginUserSchema.validateSync(req.body);
  const user = await prisma.user.findUnique({
    where: { email: validSchema.email },
  });
  if (!user) {
    throw createHttpError(400, "Invalid Email or Password...");
  }
  const passwordMatches = await bcrypt.compare(
    validSchema.password,
    user.password
  );
  if (!passwordMatches) {
    throw createHttpError(400, "Invalid Email or Password...");
  }
  res
    .status(200)
    .cookie("token", generatetoken(user.id))
    .json({ token: generatetoken(user.id) });
});

//@desc Gets an Existing User Info
//@route POST /v1/api/auth/me
//@access Private
const getUserInfo: RequestHandler = asyncHandler(async (req, res) => {
  const userId = res.locals.userId;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw createHttpError(400, "User not Exists or token Expired...");
  }
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
});

const generatetoken = (userId: string) => {
  const JWT_SECRET = process.env.JWT_SECRET || "secret123";
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });
};

export const UserController = {
  registerUser,
  loginUser,
  getUserInfo,
};
