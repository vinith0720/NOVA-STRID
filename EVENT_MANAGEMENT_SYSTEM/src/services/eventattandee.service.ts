import prisma from "@utils/client.utils.js";
import {
  EventAttendeCreateInput,
  EventAttendeUpdateInput,
} from "@dto/eventattende.js";

export default class EventAttendeService {
  static readonly getALLEventAttende = async () => {
    try {
      const result = await prisma.eventAttendee.findMany();
      return result;
    } catch (error) {
      console.log("Error in getAllEventAttende service : ", error);
      throw error;
    }
  };

  static readonly createEventAttende = async (
    data: EventAttendeCreateInput
  ) => {
    try {
      const result = await prisma.eventAttendee.create({
        data: {
          ...data,
        },
      });
      return result;
    } catch (error) {
      console.log("Error in createEventAttende service : ", error);
      throw error;
    }
  };

  static readonly updateEventAttendeById = async (
    id: string,
    updateEventAttende: EventAttendeUpdateInput
  ) => {
    try {
      const result = await prisma.eventAttendee.update({
        data: { ...updateEventAttende },
        where: { id },
      });
      return result;
    } catch (error) {
      console.log("Error in updateEventAttendeById service : ", error);
      throw error;
    }
  };

  static readonly deleteEventAttendeById = async (id: string) => {
    try {
      const result = await prisma.eventAttendee.delete({
        where: { id },
      });
      return result;
    } catch (error) {
      console.log("Error in deleteEventAttendeById service : ", error);
      throw error;
    }
  };

  static readonly getEventAttendeById = async (id: string) => {
    try {
      const result = await prisma.eventAttendee.findUnique({
        where: { id: id },
      });
      return result;
    } catch (error) {
      console.log("Error in getEventAttendeById service : ", error);
      throw error;
    }
  };
}
