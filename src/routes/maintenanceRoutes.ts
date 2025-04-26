import { Router } from 'express';
import {
    scheduleMaintenance,
    getAllMaintenance,
    getMaintenanceHistory,
    getMaintenanceById,
    updateMaintenance,
    cancelMaintenance
} from '../controllers/maintenanceController';

const router = Router();

router.post('/', scheduleMaintenance);
router.get('/', getAllMaintenance);
router.get('/history', getMaintenanceHistory);
router.get('/:id', getMaintenanceById);
router.put('/:id', updateMaintenance);
router.delete('/:id', cancelMaintenance);

export default router;