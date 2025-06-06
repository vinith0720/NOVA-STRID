import { Router } from 'express';
import {
  getAllAnimal,
  getAnimalById,
  createAnimal,
  updateAnimalById,
  deleteAnimalById,
} from '@controllers/animalcontroller';
const router = Router();

router.get('/getanimalall', getAllAnimal);

router.post('/createanimal', createAnimal);

router.put('/updateanimal/:id', updateAnimalById);

router.delete('/deleteanimal/:id', deleteAnimalById);

router.get('/getanimal/:id', getAnimalById);

export default router;
