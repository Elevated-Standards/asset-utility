import { Router, Request, Response } from 'express';
import { MaintenanceService } from '../services/maintenanceService';
import { MaintenanceScheduleNotFoundError } from '../utils/errors';

const router = Router();
const maintenanceService = new MaintenanceService();

/**
 * POST /maintenance
 * Schedule new maintenance for an asset
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { assetId, startDate, endDate, ...details } = req.body;
        
        const schedule = maintenanceService.scheduleMaintenance(
            assetId,
            new Date(startDate),
            new Date(endDate),
            details
        );

        res.status(201).json(schedule);
    } catch (error) {
        res.status(400).json({
            error: 'Invalid maintenance schedule data',
            details: error.message
        });
    }
});

/**
 * GET /maintenance/asset/:assetId
 * Get maintenance history for an asset
 */
router.get('/asset/:assetId', (req: Request, res: Response) => {
    const history = maintenanceService.getMaintenanceHistory(req.params.assetId);
    res.json(history);
});

/**
 * GET /maintenance/:id
 * Get a specific maintenance schedule
 */
router.get('/:id', (req: Request, res: Response) => {
    try {
        const schedule = maintenanceService.getScheduleById(req.params.id);
        res.json(schedule);
    } catch (error) {
        if (error instanceof MaintenanceScheduleNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

/**
 * PUT /maintenance/:id
 * Update a maintenance schedule
 */
router.put('/:id', (req: Request, res: Response) => {
    try {
        const schedule = maintenanceService.updateMaintenanceSchedule(
            req.params.id,
            req.body
        );
        res.json(schedule);
    } catch (error) {
        if (error instanceof MaintenanceScheduleNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(400).json({
                error: 'Invalid maintenance data',
                details: error.message
            });
        }
    }
});

/**
 * DELETE /maintenance/:id
 * Cancel a maintenance schedule
 */
router.delete('/:id', (req: Request, res: Response) => {
    try {
        maintenanceService.cancelSchedule(req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof MaintenanceScheduleNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

export default router;