import { ZooCreateInput, ZooUpdateInput } from 'dto/zoo';
import { NextFunction, Request, Response } from 'express';
import { ZooService } from '@services/zooService';
import redisClient from '@utils/redis';

// GET all zoos
export const getAllZoo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheKey = 'zoo:all';
    const cachedZoos = await redisClient.get(cacheKey);
    if (cachedZoos) {
      console.log('✅ Cache hit');
      return res.status(200).json(JSON.parse(cachedZoos));
    }

    console.log('⏳ Cache miss → Prisma');
    const zoos = await ZooService.getALLZoo();

    if (zoos.length > 0) {
      await redisClient.setEx(cacheKey, 60, JSON.stringify(zoos));
      return res.status(200).json(zoos);
    } else {
      return res.status(404).json({ message: 'Zoos not found' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// GET zoo by ID
export const getZooById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = +req.params.id;
    const zoo = await ZooService.getZooById(id);
    zoo ? res.status(200).json(zoo) : res.status(402).json({ message: 'zoo are not found' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// POST new zoo
export const createZoo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: ZooCreateInput = req.body;
    const zoo = await ZooService.createZoo(data);
    res.status(201).json(zoo);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// PUT update zoo
export const updateZooById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const data: ZooUpdateInput = req.body;
    const Zoo = await ZooService.updateZooById(id, data);
    res.status(200).json(Zoo);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// DELETE zoo
export const deleteZooById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const data = await ZooService.deleteZooById(id);
    data
      ? res.status(200).json({
          message: `The Zoo id : ${data.id} and Zoo name : ${data.name} is deleted successfully`,
        })
      : res.status(404).json({ message: `${data} is not  deleted` });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
