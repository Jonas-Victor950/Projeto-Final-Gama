import { Request, Response } from "express";
import { ValidationError } from "express-validation";

export default function handleError(error: any, req: Request, res: Response, next: any) {
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json(error);
  }

  return res.status(500).json(error);
}
