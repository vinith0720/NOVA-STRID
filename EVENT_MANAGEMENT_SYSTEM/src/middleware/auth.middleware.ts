import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AttendeeCreateInput } from "@dto/attandee.dto.js";
dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const JWT_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in .env");
}

export const jwttokencreate = (payload: AttendeeCreateInput) => {
  try {
    return jwt.sign(payload, JWT_KEY, { expiresIn: "1h" });
  } catch (error) {
    throw Error("error in jwt token creation ");
  }
};
export const authenticate = (secret: string = JWT_KEY) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }
  };
};
