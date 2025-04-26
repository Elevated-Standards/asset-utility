export class MaintenanceSchedule {
    assetId: string;
    scheduleDate: Date;
    maintenanceDetails: string;

    constructor(assetId: string, scheduleDate: Date, maintenanceDetails: string) {
        this.assetId = assetId;
        this.scheduleDate = scheduleDate;
        this.maintenanceDetails = maintenanceDetails;
    }
}