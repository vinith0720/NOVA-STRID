import { Request, Response, NextFunction } from "express";
import { jwttokencreate } from "@middleware/auth.middleware.js";
import AttendeeService from "@services/attandee.service.js";
import { AttendeeCreateInput } from "@dto/attandee.dto.js";
import { Responsetype } from "@dto/index.dto.js";
export default class AttendeeController {
  static getAllAttendee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const responsedata = await AttendeeService.getALLAttendee();
      responsedata
        ? res.status(200).json({
            message: "all attendee",
            data: responsedata,
          } satisfies Responsetype)
        : res.status(200).json({
            message: "no attendees are found",
            data: responsedata,
          } satisfies Responsetype);
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
      // res.status(200).json({
      //   message: "Attende created successfully",
      //   data: responsedata,
      // } satisfies Responsetype);
      res.render("login", { error: null });
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
        ? payload.name === data.name
          ? res.status(200).json({
              message: "Login success",
              token: jwttokencreate(data),
            })
          : res
              .status(404)
              .json({ message: "login failed" } satisfies Responsetype)
        : res
            .status(404)
            .json({ message: "Attendee not found" } satisfies Responsetype);
    } catch (error) {
      next(error);
    }
  };
}
