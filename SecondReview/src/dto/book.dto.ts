import { Prisma } from "@prisma/client";

export type BookCreateData = Omit<Prisma.BookUncheckedCreateInput, "id">;

export type page = {
  limit: number;
  offset: number;
};
