import { Request, Response, NextFunction } from "express";

import AppError from "../errors/app";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Invalid API Request!", 404));
};

export const serverError = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) return next(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ message });
};
