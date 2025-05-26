import express, { NextFunction } from "express";
import indexRouter from "@routers/index";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/", indexRouter);

app.use(
  async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.error(err);

    if (res.headersSent) {
      return next(err);
    }

    if (err.name === "ZodError") {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ message: "Internal server error occurred" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
  console.log(`WORKER PROCESS ID : ${process.pid}`);
});
