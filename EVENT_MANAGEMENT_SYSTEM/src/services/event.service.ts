import prisma from "@utils/client.utils.js";
import { EventCreateInput, EventUpdateInput } from "@dto/event.dto.js";
import { date } from "zod";

export default class EventService {
  static getALLEvent = async () => {
    try {
      return prisma.event.findMany();
    } catch (error) {
      console.log("Error in getAllEvent service : ", error);
      throw error;
    }
  };

  static createEvent = async (data: EventCreateInput) => {
    try {
      return prisma.event.create({
        data: {
          ...data,
          date: new Date(data.date),
        },
      });
    } catch (error) {
      console.log("Error in createEvent service : ", error);
      throw error;
    }
  };

  static updateEventById = async (
    id: string,
    updateEvent: EventUpdateInput
  ) => {
    try {
      return prisma.event.update({ data: { ...updateEvent }, where: { id } });
    } catch (error) {
      console.log("Error in updateEventById service : ", error);
      throw error;
    }
  };

  static deleteEventById = async (id: string) => {
    try {
      return prisma.event.delete({ where: { id } });
    } catch (error) {
      console.log("Error in deleteEventById service : ", error);
      throw error;
    }
  };

  static getEventById = async (id: string) => {
    try {
      return prisma.event.findUnique({ where: { id: id } });
    } catch (error) {
      console.log("Error in getEventById service : ", error);
      throw error;
    }
  };
}
