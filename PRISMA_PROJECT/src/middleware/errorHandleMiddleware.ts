import { Request, Response, NextFunction } from 'express';

export const erroHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Error message in Error handler :', err);
    console.log(Reflect.ownKeys(err));
    res.status(500).json({ Error: err.name });
  } catch (error) {
    console.log('Error in ErrorMiddleware :', error);
  }
};
