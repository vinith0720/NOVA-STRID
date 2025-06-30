import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: ["error", "query", "warn", "info"],
});

import { BookCreateData } from "../dto/book.dto";

export default class Book {
  static getBook = async (limit: number, offset: number) => {
    return prisma.book.findMany({
      skip: offset,
      take: limit,
    });
  };

  static createBook = async (bookdata: BookCreateData) => {
    return prisma.book.create({
      data: bookdata,
    });
  };
}
