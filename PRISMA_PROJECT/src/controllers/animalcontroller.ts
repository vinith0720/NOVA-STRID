import { AnimalCreateInput, AnimalUpdateInput } from 'dto/animal';
import { NextFunction, Request, Response } from 'express';
import { AnimalService } from '@services/animalService';

// GET all Animals
export const getAllAnimal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const animals = await AnimalService.getALLAnimal();
    animals.length > 0
      ? res.status(200).json(animals)
      : res.status(402).json({ message: 'Animals are not found' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// GET Animal by ID
export const getAnimalById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = +req.params.id;
    const animal = await AnimalService.getAnimalById(id);
    animal
      ? res.status(200).json(animal)
      : res.status(402).json({ message: 'animal are not found' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// POST new Animal
export const createAnimal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: AnimalCreateInput = req.body;
    const Animal = await AnimalService.createAnimal(data);
    res.status(201).json(Animal);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// PUT update Animal
export const updateAnimalById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const data: AnimalUpdateInput = req.body;
    const Animal = await AnimalService.updateAnimalById(id, data);
    res.status(200).json(Animal);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// DELETE Animal
export const deleteAnimalById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const data = await AnimalService.deleteAnimalById(id);
    data
      ? res.status(200).json({
          message: `The Animal id : ${data.id} and Animal name : ${data.name} is deleted successfully `,
        })
      : res.status(404).json({ message: 'deleted the animal is failed' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
