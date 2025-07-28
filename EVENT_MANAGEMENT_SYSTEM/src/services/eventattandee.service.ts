import prisma from "@utils/client.utils.js";
import {
  EventAttendeCreateInput,
  EventAttendeUpdateInput,
} from "@dto/eventattende.js";

export default class EventAttendeService {
  static readonly getALLEventAttende = async () => {
    try {
      return prisma.eventAttendee.findMany();
    } catch (error) {
      console.log("Error in getAllEventAttende service : ", error);
      throw error;
    }
  };

  static readonly createEventAttende = async (
    data: EventAttendeCreateInput
  ) => {
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

  static readonly updateEventAttendeById = async (
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

  static readonly deleteEventAttendeById = async (id: string) => {
    try {
      return prisma.eventAttendee.delete({
        where: { id },
      });
    } catch (error) {
      console.log("Error in deleteEventAttendeById service : ", error);
      throw error;
    }
  };

  static readonly getEventAttendeById = async (id: string) => {
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
