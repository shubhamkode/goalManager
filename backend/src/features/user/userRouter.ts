import express, { Router } from "express";

import { UserController } from "./userController";
import { protect } from "../../middlewares/authMiddleware";

export const userRouter: Router = express.Router();

userRouter.post("/", UserController.registerUser);

userRouter.post("/login", UserController.loginUser);

userRouter.get("/me", protect, UserController.getUserInfo);
