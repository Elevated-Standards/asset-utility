export class MaintenanceController {
    constructor(private maintenanceService: any) {}

    scheduleMaintenance(req: any, res: any) {
        const { assetId, scheduleDate, maintenanceDetails } = req.body;
        this.maintenanceService.scheduleMaintenance(assetId, scheduleDate, maintenanceDetails)
            .then((result: any) => res.status(201).json(result))
            .catch((error: any) => res.status(500).json({ error: error.message }));
    }

    getMaintenanceHistory(req: any, res: any) {
        const { assetId } = req.params;
        this.maintenanceService.getMaintenanceHistory(assetId)
            .then((history: any) => res.status(200).json(history))
            .catch((error: any) => res.status(500).json({ error: error.message }));
    }

    updateMaintenanceSchedule(req: any, res: any) {
        const { assetId } = req.params;
        const { scheduleDate, maintenanceDetails } = req.body;
        this.maintenanceService.updateMaintenanceSchedule(assetId, scheduleDate, maintenanceDetails)
            .then((result: any) => res.status(200).json(result))
            .catch((error: any) => res.status(500).json({ error: error.message }));
    }
}