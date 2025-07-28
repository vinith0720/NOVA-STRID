import prisma from "@utils/client.utils.js";
import {
  AttendeeCreateInput,
  AttendeeUpdateInput,
  GetAttendeeInput,
} from "@dto/attandee.dto.js";

export default class AttendeeService {
  static readonly getALLAttendee = async () => {
    try {
      return prisma.attendee.findMany();
    } catch (error) {
      console.log("Error in getAllAttendee service : ", error);
      throw error;
    }
  };

  static readonly createAttendee = async (data: AttendeeCreateInput) => {
    try {
      return prisma.attendee.create({
        data: {
          ...data,
        },
      });
    } catch (error) {
      console.log("Error in createAttendee service : ", error);
      throw error;
    }
  };

  static readonly updateAttendeeById = async (
    id: string,
    updateAttendee: AttendeeUpdateInput
  ) => {
    try {
      return prisma.attendee.update({
        data: { ...updateAttendee },
        where: { id },
      });
    } catch (error) {
      console.log("Error in updateAttendeeById service : ", error);
      throw error;
    }
  };

  static readonly deleteAttendeeById = async (id: string) => {
    try {
      return prisma.attendee.delete({ where: { id } });
    } catch (error) {
      console.log("Error in deleteAttendeeById service : ", error);
      throw error;
    }
  };

  static readonly getAttendeeByIdorEmail = async (input: GetAttendeeInput) => {
    try {
      return prisma.attendee.findUnique({
        where: input.id ? { id: input.id } : { email: input.email },
      });
    } catch (error) {
      console.log("Error in getAttendeeById service : ", error);
      throw error;
    }
  };
}
