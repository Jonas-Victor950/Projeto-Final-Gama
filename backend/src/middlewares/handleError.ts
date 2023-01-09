import { Request, Response } from "express";
import { UnauthorizedError } from "express-jwt/dist/errors/UnauthorizedError";
import { ValidationError } from "express-validation";

export default function handleError(
  error: any,
  req: Request,
  res: Response,
  next: any
) {
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json(error);
  }

  if (error instanceof UnauthorizedError) {
    return res.status(error.status).json(error);
  }

  return res.status(500).json(error);
}
