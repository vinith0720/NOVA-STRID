// import prisma from '../src/client';
// import { PrismaClient } from '@prisma/client';
// import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

// jest.mock('../src/client', async () => ({
//   __esModule: true,
//   default: mockDeep<PrismaClient>(),
// }));

// beforeEach(() => {
//   mockReset(prismaMock);
// });

// export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

// File: test/setupTests.ts

import prisma from '../src/utils/client';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

export const prismaMock = mockDeep<PrismaClient>() as DeepMockProxy<PrismaClient>;

jest.mock('../src/client', () => ({
  __esModule: true,
  default: prismaMock,
}));

beforeEach(() => {
  mockReset(prismaMock);
});
