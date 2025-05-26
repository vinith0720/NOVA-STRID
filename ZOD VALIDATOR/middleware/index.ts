import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { LoginInput } from "@schema/index";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      console.error("Validation failed:", result.error.flatten());
      res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }
    req.body = result.data as LoginInput;
    next();
  };
