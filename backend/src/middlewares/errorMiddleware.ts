import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log({res})
  return res
    .status(statusCode)
    .json({ message: err.message, stack: err.stack });
};
