import { Request, Response, NextFunction } from "express";
import EventService from "@services/event.service.js";
import { EventCreateInput, EventUpdateInput } from "@dto/event.dto.js";

export default class EventController {
  static getAllEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responsedata = await EventService.getALLEvent();
      responsedata
        ? res.status(200).json({ message: "all Event", data: responsedata })
        : res
            .status(200)
            .json({ message: "NO Events are found", data: responsedata });
    } catch (error) {
      next(error);
    }
  };
  static createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data: EventCreateInput = req.body;
    try {
      const responsedata = await EventService.createEvent(data);
      res
        .status(200)
        .json({ message: "Event created successfully", data: responsedata });
    } catch (error) {
      next(error);
    }
  };
  static updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data: EventUpdateInput = req.body;
    const id = req.params.id;
    try {
      const responsedata = await EventService.updateEventById(id, data);
      res
        .status(200)
        .json({ message: "event updated successfully", data: responsedata });
    } catch (error) {
      next(error);
    }
  };
  static deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      const responsedata = await EventService.deleteEventById(id);
      res
        .status(200)
        .json({ message: "event deleted successfully", data: responsedata });
    } catch (error) {
      next(error);
    }
  };
}
