import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

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
      });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          // Unique constraint failed
          return res.status(409).json({
            message: "Unique constraint failed",
            meta: error.meta,
          });

        case "P2025":
          // Record not found
          return res.status(404).json({
            message: "Record not found",
            meta: error.meta,
          });

        default:
          return res.status(400).json({
            message: "Prisma known request error",
            code: error.code,
            meta: error.meta,
          });
      }
    }

    res.status(500).json({ message: "unknown error", error });
    return;
  } catch (error) {
    console.error("Error in Error handle middleware", error);
    res.status(500).json({ error: "Internl server Error" });
    return;
  }
}
