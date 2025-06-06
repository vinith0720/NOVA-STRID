import { Router } from 'express';
import {
  getAllZoo,
  getZooById,
  createZoo,
  updateZooById,
  deleteZooById,
} from '@controllers/zoocontroller';

const router = Router();

router.get('/getZooall', getAllZoo);

router.post('/createZoo', createZoo);

router.put('/updateZoo/:id', updateZooById);

router.delete('/deleteZoo/:id', deleteZooById);

router.get('/getZoo/:id', getZooById);

export default router;
