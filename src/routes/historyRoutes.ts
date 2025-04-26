import { Router } from 'express';
import { getAllAssetHistory, getAssetHistoryById } from '../controllers/historyController';

const router = Router();

router.get('/assets', getAllAssetHistory);
router.get('/assets/:id', getAssetHistoryById);

export default router;