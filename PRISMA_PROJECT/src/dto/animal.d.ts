import { Prisma } from '@prisma/client';

export type AnimalCreateInput = Omit<Prisma.AnimalCreateManyInput, 'id'>;

export type AnimalUpdateInput = Partial<AnimalCreateInput>;
