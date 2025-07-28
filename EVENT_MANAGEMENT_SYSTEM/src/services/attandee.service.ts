import prisma from "@utils/client.utils.js";
import {
  AttendeeCreateInput,
  AttendeeUpdateInput,
  GetAttendeeInput,
} from "@dto/attandee.dto.js";

export default class AttendeeService {
  static readonly getALLAttendee = async () => {
    try {
      const result = await prisma.attendee.findMany();
      return result;
    } catch (error) {
      console.log("Error in getAllAttendee service : ", error);
      throw error;
    }
  };

  static readonly createAttendee = async (data: AttendeeCreateInput) => {
    try {
      const result = await prisma.attendee.create({
        data: {
          ...data,
        },
      });
      return result;
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
      const result = await prisma.attendee.update({
        data: { ...updateAttendee },
        where: { id },
      });
      return result;
    } catch (error) {
      console.log("Error in updateAttendeeById service : ", error);
      throw error;
    }
  };

  static readonly deleteAttendeeById = async (id: string) => {
    try {
      const result = await prisma.attendee.delete({ where: { id } });
      return result;
    } catch (error) {
      console.log("Error in deleteAttendeeById service : ", error);
      throw error;
    }
  };

  static readonly getAttendeeByIdorEmail = async (input: GetAttendeeInput) => {
    try {
      const result = await prisma.attendee.findUnique({
        where: input.id ? { id: input.id } : { email: input.email },
      });
      return result;
    } catch (error) {
      console.log("Error in getAttendeeById service : ", error);
      throw error;
    }
  };
}
