import { Request, Response, NextFunction } from "express";
import Book from "../service/book.service";
import { BookCreateData, page } from "../dto/book.dto";
import { createBookValidate, pagination } from "../middleware/zod.validate";
import { error } from "console";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const datas = createBookValidate.safeParse(req.body);
  if (!datas.success) {
    res.status(400).json(datas.error.flatten());
  }
  const data = req.body;
  try {
    const book = await Book.createBook(data);
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const datas = pagination.safeParse(req.body);
  if (!datas.success) {
    res.status(400).json(datas.error.flatten());
  }
  const data: page = req.body;
  try {
    const book = await Book.getBook(data.limit, data.offset);
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
