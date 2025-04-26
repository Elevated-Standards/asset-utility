import { Router } from 'express';
import MaintenanceController from '../controllers/maintenanceController';

const router = Router();
const maintenanceController = new MaintenanceController();

router.post('/schedule', maintenanceController.scheduleMaintenance.bind(maintenanceController));
router.get('/history/:assetId', maintenanceController.getMaintenanceHistory.bind(maintenanceController));
router.put('/update/:scheduleId', maintenanceController.updateMaintenanceSchedule.bind(maintenanceController));

export default function setMaintenanceRoutes(app) {
    app.use('/api/maintenance', router);
}