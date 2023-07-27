import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

import { env } from "../config/env";

export const protect: RequestHandler = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw createHttpError(400, "Token Not Found");
  }

  const decoded: any = jwt.verify(token, env.JWT_SECRET);

  const userId = decoded.userId;

  if (userId && typeof userId === "string") {
    res.locals.userId = userId;
    next();
  } else {
    throw createHttpError(400, "Token Expired or Invalid Token");
  }
});
