import { Request, Response, Router } from "express";

const route = Router();

route.get("/", (req: Request, res: Response) => res.redirect("/login"));

route.get("/login", (req: Request, res: Response) => {
  res.render("login", { error: null });
});

route.get("/register", (req: Request, res: Response) => {
  res.render("register", { error: null });
});

export default route;
