import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { setUpSwagger } from "@swagger/setup.swagger.js";
import { errorHandlingMiddleware } from "@middleware/error.middleware.js";
import EventRouter from "@routers/event.route.js";
import AttendeeRouter from "@routers/attandee.route.js";
import htmlroute from "@routers/render.route.js";

// __filename & __dirname for ESM!
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env configuration loaded
dotenv.config();
const PORT = process.env.PORT;
const APP_URL = process.env.APP_URL;

// Express initialization
const app = express();

// Express basic Middleware set
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
setUpSwagger(app);
// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// router set
app.use("/", htmlroute);
app.use("/event", EventRouter);
app.use("/attendee", AttendeeRouter);

//error handler
app.use(errorHandlingMiddleware);

// express running
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON: ${APP_URL}:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
