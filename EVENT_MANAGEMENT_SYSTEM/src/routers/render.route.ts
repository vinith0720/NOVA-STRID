import { Request, Response, NextFunction, Router } from "express";
import AttendeeController from "@controllers/attandee.controller.js";

const route = Router();

route.get("/", (req: Request, res: Response) => res.redirect("/login"));

route.get("/login", (req: Request, res: Response) => {
  res.render("login", { error: null });
});

route.get("/register", (req: Request, res: Response) => {
  res.render("register", { error: null });
});

export default route;
