import { Request, Response, NextFunction } from "express";
import EventService from "@services/event.service.js";
import { EventCreateInput, EventUpdateInput } from "@dto/event.dto.js";
import { AttendeeCreateInput } from "@dto/attandee.dto.js";
import prisma from "@utils/client.utils.js";

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

  static attandeeCreateWithEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const body: AttendeeCreateInput = req.body;
    try {
      const event = await EventService.getEventById(id);
      if (!event) {
        res.status(200).json({ message: "event id not found " });
        return;
      }
      const [attendee, eventAttendee] = await prisma.$transaction(
        async (tx) => {
          const attendee = await tx.attendee.create({
            data: body,
          });

          const eventAttendee = await tx.eventAttendee.create({
            data: {
              eventId: event.id,
              attendeeId: attendee.id,
            },
          });

          return [attendee, eventAttendee];
        }
      );

      res.status(201).json({ message: "attendee created successfuly" });
    } catch (error) {
      next(error);
    }
  };

  static getEventBYID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      const event = await EventService.getEventById(id);
      event
        ? res.status(200).json({
            message: "success",
            attendee_count: event.attendees.length,
            data: event,
          })
        : res.status(404).json({ message: "eventid not found" });
    } catch (error) {
      next(error);
    }
  };
}
