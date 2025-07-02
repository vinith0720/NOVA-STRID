import prisma from '@utils/client';
import { AnimalCreateInput, AnimalUpdateInput } from '@dto/animal';

export class AnimalService {
  static getALLAnimal = async () => {
    try {
      return prisma.animal.findMany();
    } catch (error) {
      console.log('Error in getAllAnimal service : ', error);
      throw error;
    }
  };

  static createAnimal = async (data: AnimalCreateInput) => {
    try {
      return prisma.animal.create({
        data: {
          ...data,
        },
      });
    } catch (error) {
      console.log('Error in createAnimal service : ', error);
      throw error;
    }
  };

  static updateAnimalById = async (id: number, updateAnimal: AnimalUpdateInput) => {
    try {
      return prisma.animal.update({ data: { ...updateAnimal }, where: { id } });
    } catch (error) {
      console.log('Error in updateAnimalById service : ', error);
      throw error;
    }
  };

  static deleteAnimalById = async (id: number) => {
    try {
      return prisma.animal.delete({ where: { id } });
    } catch (error) {
      console.log('Error in deleteAnimalById service : ', error);
      throw error;
    }
  };

  static getAnimalById = async (id: number) => {
    try {
      return prisma.animal.findUnique({ where: { id: id } });
    } catch (error) {
      console.log('Error in getAnimalById service : ', error);
      throw error;
    }
  };
}
