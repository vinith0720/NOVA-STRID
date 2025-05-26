import { Request, Response, NextFunction } from "express";
import { LoginInput, loginSchema } from "@schema/index";

const db: LoginInput = {
  email: "vinith@gmail.com",
  password: "vinithkumar",
  role: "Admin",
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated: LoginInput = req.body;
    console.log("Validated data :", validated);
    if (db.email === validated.email && db.password === validated.password) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "invalid crendiatls email or password" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
