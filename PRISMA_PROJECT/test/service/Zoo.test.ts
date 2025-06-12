import { ZooCreateInput } from '@dto/zoo';
import { ZooService } from '../../src/services/zooService';
import { prismaMock } from '../index';

describe('ZooService Tests', () => {
  const mockZoo = {
    id: 1,
    name: 'Safari Kingdom',
    location: 'South Africa',
    createdAt: new Date('2025-06-06T04:36:30.430Z'),
    updatedAt: new Date('2025-06-06T04:36:30.430Z'),
    animal: [
      {
        id: 1,
        name: 'Leo',
        species: 'Lion',
        zooId: 1,
      },
      {
        id: 2,
        name: 'Zara',
        species: 'Zebra',
        zooId: 1,
      },
    ],
  };

  test('should get all zoos', async () => {
    prismaMock.zoo.findMany.mockResolvedValue([mockZoo]);

    const result = await ZooService.getALLZoo();
    expect(result).toEqual([mockZoo]);
    expect(prismaMock.zoo.findMany).toHaveBeenCalled();
  });

  test('should create a zoo', async () => {
    prismaMock.zoo.create.mockResolvedValue(mockZoo);

    const data = {
      name: 'Amazon Wildlife',
      location: 'Brazil',
    };

    const result = await ZooService.createZoo(data);
    expect(result).toEqual(mockZoo);
    expect(prismaMock.zoo.create).toHaveBeenCalledWith({ data });
  });

  test('should update a zoo by id', async () => {
    const updatedZoo = { ...mockZoo, name: 'Safari Park' };
    prismaMock.zoo.update.mockResolvedValue(updatedZoo);

    const updateData = { name: 'Safari Park', location: 'Brazil' };
    const result = await ZooService.updateZooById(1, updateData);

    expect(result).toEqual(updatedZoo);
    expect(prismaMock.zoo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateData,
    });
  });

  test('should delete a zoo by id', async () => {
    prismaMock.zoo.delete.mockResolvedValue(mockZoo);

    const result = await ZooService.deleteZooById(1);
    expect(result).toEqual(mockZoo);
    expect(prismaMock.zoo.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  test('should get zoo by id', async () => {
    prismaMock.zoo.findUnique.mockResolvedValue(mockZoo);

    const result = await ZooService.getZooById(1);
    expect(result).toEqual(mockZoo);
    expect(prismaMock.zoo.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { animal: true },
    });
  });
});
