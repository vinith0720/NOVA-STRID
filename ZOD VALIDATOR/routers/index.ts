import express, { Router, Request, Response } from "express";
import { login } from "@controllers/index";
import { loginSchema } from "@schema/index";
import { validate } from "@middleware/index";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Express is Working !!!" });
});

router.post("/", validate(loginSchema), login);

export default router;
