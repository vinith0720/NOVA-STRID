import { Request, Response, NextFunction } from "express";
import AttendeeService from "@services/attandee.service.js";
import { Parser } from "json2csv";
export const csvDownoad = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await AttendeeService.getALLAttendee();
    const parser = new Parser();
    const csv = parser.parse(data);
    res.set("Content-Type", "text/csv");
    res.end(csv);
  } catch (error) {
    next(error);
  }
};
