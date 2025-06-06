import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: ['info', 'query', 'error', 'warn'] });

import { ZooCreateInput, ZooUpdateInput } from 'dto/zoo';

export class ZooService {
  static getALLZoo = async () => {
    try {
      return prisma.zoo.findMany({
        include: {
          animal: true,
        },
      });
    } catch (error) {
      console.log('Error in getAllZoo service : ', error);
      throw error;
    }
  };

  static createZoo = async (data: ZooCreateInput) => {
    try {
      return prisma.zoo.create({
        data: {
          ...data,
        },
      });
    } catch (error) {
      console.log('Error in createZoo service : ', error);
      throw error;
    }
  };

  static updateZooById = async (id: number, updateZoo: ZooUpdateInput) => {
    try {
      return prisma.zoo.update({ data: { ...updateZoo }, where: { id } });
    } catch (error) {
      console.log('Error in updateZooById service : ', error);
      throw error;
    }
  };

  static deleteZooById = async (id: number) => {
    try {
      return prisma.zoo.delete({ where: { id } });
    } catch (error) {
      console.log('Error in deleteZooById service : ', error);
      throw error;
    }
  };

  static getZooById = async (id: number) => {
    try {
      return prisma.zoo.findUnique({ where: { id: id }, include: { animal: true } });
    } catch (error) {
      console.log('Error in getZooById service : ', error);
      throw error;
    }
  };
}
