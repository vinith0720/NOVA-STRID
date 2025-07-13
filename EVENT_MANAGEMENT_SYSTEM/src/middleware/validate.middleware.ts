import { Request, Response, NextFunction } from "express";
import { z, ZodObject, ZodString, ZodUUID } from "zod";

interface ValidationSchemas {
  body?: ZodObject;
  query?: ZodObject;
  params?: ZodObject;
  headers?: ZodObject;
}

export const ZodValidateMiddleware =
  (schemas: ValidationSchemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const result = schemas.body.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json({
            message: "Invalid body",
            errors: z.prettifyError(result.error),
          });
        }
        req.body = result.data;
      }

      if (schemas.query) {
        const result = schemas.query.safeParse(req.query);
        if (!result.success) {
          return res.status(400).json({
            message: "Invalid query",
            errors: z.prettifyError(result.error),
          });
        }
        req.query = result.data as any;
      }

      if (schemas.params) {
        const result = schemas.params.safeParse(req.params);
        if (!result.success) {
          return res.status(400).json({
            message: "Invalid params",
            errors: z.prettifyError(result.error),
          });
        }
        req.params = result.data as any;
      }

      if (schemas.headers) {
        const result = schemas.headers.safeParse(req.headers);
        if (!result.success) {
          return res.status(400).json({
            message: "Invalid headers",
            errors: z.prettifyError(result.error),
          });
        }
        req.headers = result.data as any;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
