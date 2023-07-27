import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = err.status ?? 500;

  return res
    .status(statusCode)
    .json({ message: err.message, stack: err.stack });
};
