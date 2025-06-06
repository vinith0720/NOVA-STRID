import { NextFunction, Request, Response } from 'express';
import { ZooService } from 'services/zooService';

// GET all zoos
export const getAllZoo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zoo = await ZooService.getALLZoo();
    zoo.length > 0
      ? res.status(200).json(zoo)
      : res.status(402).json({ message: 'zooes are not found' });
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
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// PUT update zoo
export const updateZooById = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
