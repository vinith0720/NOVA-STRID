import prisma from "@utils/client.utils.js";
import {
  EventAttendeCreateInput,
  EventAttendeUpdateInput,
} from "@dto/eventattende.js";

export default class EventAttendeService {
  static getALLEventAttende = async () => {
    try {
      return prisma.eventAttendee.findMany();
    } catch (error) {
      console.log("Error in getAllEventAttende service : ", error);
      throw error;
    }
  };

  static createEventAttende = async (data: EventAttendeCreateInput) => {
    try {
      return prisma.eventAttendee.create({
        data: {
          ...data,
        },
      });
    } catch (error) {
      console.log("Error in createEventAttende service : ", error);
      throw error;
    }
  };

  static updateEventAttendeById = async (
    id: string,
    updateEventAttende: EventAttendeUpdateInput
  ) => {
    try {
      return prisma.eventAttendee.update({
        data: { ...updateEventAttende },
        where: { id },
      });
    } catch (error) {
      console.log("Error in updateEventAttendeById service : ", error);
      throw error;
    }
  };

  static deleteEventAttendeById = async (id: string) => {
    try {
      return prisma.eventAttendee.delete({
        where: { id },
      });
    } catch (error) {
      console.log("Error in deleteEventAttendeById service : ", error);
      throw error;
    }
  };

  static getEventAttendeById = async (id: string) => {
    try {
      return prisma.eventAttendee.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.log("Error in getEventAttendeById service : ", error);
      throw error;
    }
  };
}
