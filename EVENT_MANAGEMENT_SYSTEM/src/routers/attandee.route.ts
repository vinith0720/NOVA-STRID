import { Router } from "express";

import AttendeeController from "@controllers/attandee.controller.js";
import { authenticate } from "@middleware/auth.middleware.js";
import { ZodValidateMiddleware } from "@middleware/validate.middleware.js";
import { createAttendeSchema } from "@dto/attandee.dto.js";

const route = Router();

route.get("/getallAttendee", authenticate(), AttendeeController.getAllAttendee);

route.post(
  "/login",
  ZodValidateMiddleware({ body: createAttendeSchema }),
  AttendeeController.attendeeLogin
);

route.post(
  "/create",
  ZodValidateMiddleware({ body: createAttendeSchema }),
  AttendeeController.createAttendee
);

export default route;
