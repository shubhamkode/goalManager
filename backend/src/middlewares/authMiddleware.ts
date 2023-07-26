import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const protect: RequestHandler = asyncHandler(async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET || "secret123";
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Not Authoroized, Invalid Token");
  }

  const decoded: any = jwt.verify(token, JWT_SECRET);

  const userId = decoded.userId;

  if (userId && typeof userId === "string") {
    res.locals.userId = userId;
    next();
  } else {
    res.status(403);
    throw new Error("Invalid token");
  }
});
