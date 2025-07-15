import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ErrorResponse } from "@dto/index.dto.js";
export function errorHandlingMiddleware(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error :", error);
  try {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error,
      } satisfies ErrorResponse);
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          // Unique constraint failed
          return res.status(409).json({
            message: "Unique constraint failed",
            errors: error.meta,
          } satisfies ErrorResponse);

        case "P2025":
          // Record not found
          return res.status(404).json({
            message: "Record not found",
            errors: error.meta,
          } satisfies ErrorResponse);

        default:
          return res.status(400).json({
            message: "Prisma known request error",
            errors: { meta: error.meta, code: error.code },
          } satisfies ErrorResponse);
      }
    }

    res.status(500).json({
      message: "unknown error",
      errors: error,
    } satisfies ErrorResponse);
    return;
  } catch (error) {
    console.error("Error in Error handle middleware", error);
    res
      .status(500)
      .json({
        message: "Internl server Error",
        errors: error,
      } satisfies ErrorResponse);
    return;
  }
}
