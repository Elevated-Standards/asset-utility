export class MaintenanceService {
    private maintenanceSchedules: MaintenanceSchedule[] = [];

    scheduleMaintenance(assetId: string, scheduleDate: Date, maintenanceDetails: string): MaintenanceSchedule {
        const newSchedule = new MaintenanceSchedule(assetId, scheduleDate, maintenanceDetails);
        this.maintenanceSchedules.push(newSchedule);
        return newSchedule;
    }

    getMaintenanceHistory(assetId: string): MaintenanceSchedule[] {
        return this.maintenanceSchedules.filter(schedule => schedule.assetId === assetId);
    }

    updateMaintenanceSchedule(assetId: string, scheduleDate: Date, maintenanceDetails: string): MaintenanceSchedule | null {
        const schedule = this.maintenanceSchedules.find(schedule => schedule.assetId === assetId && schedule.scheduleDate === scheduleDate);
        if (schedule) {
            schedule.maintenanceDetails = maintenanceDetails;
            return schedule;
        }
        return null;
    }
}