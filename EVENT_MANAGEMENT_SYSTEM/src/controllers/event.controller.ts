import { Request, Response, NextFunction } from "express";
import EventService from "@services/event.service.js";
import prisma from "@utils/client.utils.js";

import { EventCreateInput, EventUpdateInput } from "@dto/event.dto.js";
import { AttendeeCreateInput } from "@dto/attandee.dto.js";
import { Responsetype } from "@dto/index.dto.js";

export default class EventController {
  static readonly getAllEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responsedata = await EventService.getALLEvent();
      responsedata
        ? res.status(200).json({
            message: "all Event",
            data: responsedata,
          } satisfies Responsetype)
        : res.status(200).json({
            message: "NO Events are found",
            data: responsedata,
          } satisfies Responsetype);
    } catch (error) {
      next(error);
    }
  };
  static readonly createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data: EventCreateInput = req.body;
    try {
      const responsedata = await EventService.createEvent(data);
      res.status(201).json({
        message: "Event created successfully",
        data: responsedata,
      } satisfies Responsetype);
    } catch (error) {
      next(error);
    }
  };
  static readonly updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data: EventUpdateInput = req.body;
    const id = req.params.id;
    try {
      const responsedata = await EventService.updateEventById(id, data);
      res.status(200).json({
        message: "event updated successfully",
        data: responsedata,
      } satisfies Responsetype);
    } catch (error) {
      next(error);
    }
  };
  static readonly deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    try {
      const responsedata = await EventService.deleteEventById(id);
      res.status(200).json({
        message: "event deleted successfully",
        data: responsedata,
      } satisfies Responsetype);
    } catch (error) {
      next(error);
    }
  };

  static readonly attandeeCreateWithEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const body: AttendeeCreateInput = req.body;
    try {
      const event = await EventService.getEventById(id);
      if (!event) {
        res
          .status(200)
          .json({ message: "event id not found " } satisfies Responsetype);
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

      res.status(201).json({
        message: "attendee created successfuly",
      } satisfies Responsetype);
    } catch (error) {
      next(error);
    }
  };

  static readonly getEventBYID = async (
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
        : res
            .status(404)
            .json({ message: "eventid not found" } satisfies Responsetype);
    } catch (error) {
      next(error);
    }
  };
}
