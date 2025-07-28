import prisma from "@utils/client.utils.js";
import { EventCreateInput, EventUpdateInput } from "@dto/event.dto.js";

export default class EventService {
  static readonly getALLEvent = async () => {
    try {
      const events = await prisma.event.findMany();
      return events;
    } catch (error) {
      console.log("Error in getAllEvent service : ", error);
      throw error;
    }
  };

  static readonly createEvent = async (data: EventCreateInput) => {
    try {
      const event = await prisma.event.create({
        data: {
          ...data,
          date: new Date(data.date),
        },
      });
      return event;
    } catch (error) {
      console.log("Error in createEvent service : ", error);
      throw error;
    }
  };

  static readonly updateEventById = async (
    id: string,
    updateEvent: EventUpdateInput
  ) => {
    try {
      const updateevent = await prisma.event.update({
        data: { ...updateEvent },
        where: { id },
      });
      return updateevent;
    } catch (error) {
      console.log("Error in updateEventById service : ", error);
      throw error;
    }
  };

  static readonly deleteEventById = async (id: string) => {
    try {
      const event = await prisma.event.delete({ where: { id } });
      return event;
    } catch (error) {
      console.log("Error in deleteEventById service : ", error);
      throw error;
    }
  };

  static readonly getEventById = async (id: string) => {
    try {
      const event = await prisma.event.findUnique({
        where: { id: id },
        include: {
          attendees: {
            include: {
              attendee: true,
            },
          },
        },
      });
      return event;
    } catch (error) {
      console.log("Error in getEventById service : ", error);
      throw error;
    }
  };
}
