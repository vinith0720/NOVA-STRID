import { Request, Response, NextFunction } from "express";
import { jwttokencreate } from "@middleware/auth.middleware.js";
import AttendeeService from "@services/attandee.service.js";
import { AttendeeCreateInput } from "@dto/attandee.dto.js";

export default class AttendeeController {
  static getAllAttendee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responsedata = await AttendeeService.getALLAttendee();
      responsedata
        ? res.status(200).json({ message: "all attendee", data: responsedata })
        : res
            .status(200)
            .json({ message: "no attendees are found", data: responsedata });
    } catch (error) {
      next(error);
    }
  };

  static createAttendee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body: AttendeeCreateInput = req.body;
    try {
      const responsedata = await AttendeeService.createAttendee(body);
      res
        .status(200)
        .json({ message: "Attende created successfully", data: responsedata });
    } catch (error) {
      next(error);
    }
  };

  static attendeeLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data: AttendeeCreateInput = req.body;
    try {
      const payload = await AttendeeService.getAttendeeByIdorEmail({
        email: data.email,
      });
      payload
        ? res
            .status(200)
            .json({ message: "Login success", data: jwttokencreate(data) })
        : res.status(404).json({ message: "Attendee not found" });
    } catch (error) {
      next(error);
    }
  };
}
