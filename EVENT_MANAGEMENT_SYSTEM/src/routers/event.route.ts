import { Router } from "express";
import { authenticate } from "@middleware/auth.middleware.js";
import EventController from "@controllers/event.controller.js";
import { ZodValidateMiddleware } from "@middleware/validate.middleware.js";
import {
  createEventSchema,
  idValidateSchema,
  updateEventSchema,
} from "@dto/event.dto.js";

const route = Router();

route.get("/getallEvent", authenticate(), EventController.getAllEvent);

route.post(
  "/create",
  authenticate(),
  ZodValidateMiddleware({ body: createEventSchema }),
  EventController.createEvent
);

route.put(
  "/update/:id",
  authenticate(),
  ZodValidateMiddleware({ body: updateEventSchema, params: idValidateSchema }),
  EventController.updateEvent
);

route.delete(
  "/delete/:id",
  authenticate(),
  ZodValidateMiddleware({ params: idValidateSchema }),
  EventController.deleteEvent
);
export default route;
