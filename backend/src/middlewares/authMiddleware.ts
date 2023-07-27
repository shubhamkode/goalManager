import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

export const protect: RequestHandler = asyncHandler(async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET || "secret123";

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw createHttpError(400, "Token Not Found");
  }

  const decoded: any = jwt.verify(token, JWT_SECRET);

  const userId = decoded.userId;

  if (userId && typeof userId === "string") {
    res.locals.userId = userId;
    next();
  } else {
    throw createHttpError(400, "Token Expired or Invalid Token");
  }
});
