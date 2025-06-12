import express from 'express';
import request from 'supertest';
import animalRouter from '../../src/routers/animalroute';
import { AnimalService } from '@services/animalService';

// ✅ App setup for integration
const app = express();
app.use(express.json());
app.use('/', animalRouter);

// ✅ Mock AnimalService before tests
jest.mock('../../src/services/animalService', () => ({
  AnimalService: {
    getALLAnimal: jest.fn(),
    getAnimalById: jest.fn(),
    createAnimal: jest.fn(),
    updateAnimalById: jest.fn(),
    deleteAnimalById: jest.fn(),
  },
}));

describe('Animal Route Integration', () => {
  afterEach(() => jest.clearAllMocks());

  it('GET /getanimalall → should return list of animals', async () => {
    (AnimalService.getALLAnimal as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Lion', species: 'Big Cat' },
    ]);

    const res = await request(app).get('/getanimalall');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: 'Lion', species: 'Big Cat' }]);
  });

  it('GET /getanimal/:id → should return a single animal', async () => {
    (AnimalService.getAnimalById as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Tiger',
      species: 'Big Cat',
    });

    const res = await request(app).get('/getanimal/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, name: 'Tiger', species: 'Big Cat' });
  });

  describe('POST /createanimal', () => {
    it('should create a new animal', async () => {
      const mockAnimal = { name: 'Elephant', species: 'Mammal' };
      const createdAnimal = { id: 1, ...mockAnimal };

      (AnimalService.createAnimal as jest.Mock).mockResolvedValue(createdAnimal);

      const res = await request(app).post('/createanimal').send(mockAnimal);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(createdAnimal);
    });
  });

  describe('PUT /updateanimal/:id', () => {
    it('should update an animal by ID', async () => {
      const updatedAnimal = { id: 1, name: 'Elephant', species: 'Herbivore' };

      (AnimalService.updateAnimalById as jest.Mock).mockResolvedValue(updatedAnimal);

      const res = await request(app)
        .put('/updateanimal/1')
        .send({ name: 'Elephant', species: 'Herbivore' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedAnimal);
    });
  });

  describe('DELETE /deleteanimal/:id', () => {
    it('should delete an animal and return a success message', async () => {
      const mockDeletedAnimal = { id: 1, name: 'Tiger' };

      (AnimalService.deleteAnimalById as jest.Mock).mockResolvedValue(mockDeletedAnimal);

      const res = await request(app).delete('/deleteanimal/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: `The Animal id : 1 and Animal name : Tiger is deleted successfully `,
      });
    });

    it('should return 404 if deletion fails', async () => {
      (AnimalService.deleteAnimalById as jest.Mock).mockResolvedValue(null);

      const res = await request(app).delete('/deleteanimal/99');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: 'deleted the animal is failed' });
    });
  });
});
