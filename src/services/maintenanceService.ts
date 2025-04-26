import { MaintenanceSchedule } from '../models/maintenanceSchedule';

export class MaintenanceService {
    private maintenanceSchedules: MaintenanceSchedule[] = [];

    scheduleMaintenance(assetId: string, startDate: Date, endDate: Date, details: {
        title: string;
        description: string;
        type: 'preventive' | 'corrective' | 'predictive';
        assignedTo: string;
        priority: 'low' | 'medium' | 'high' | 'critical';
        notes?: string;
    }): MaintenanceSchedule {
        const newSchedule: MaintenanceSchedule = {
            id: Date.now().toString(),
            assetId,
            startDate,
            endDate,
            status: 'scheduled',
            ...details,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        this.maintenanceSchedules.push(newSchedule);
        return newSchedule;
    }

    getMaintenanceHistory(assetId: string): MaintenanceSchedule[] {
        return this.maintenanceSchedules.filter(schedule => schedule.assetId === assetId);
    }

    updateMaintenanceSchedule(scheduleId: string, updates: Partial<MaintenanceSchedule>): MaintenanceSchedule | null {
        const index = this.maintenanceSchedules.findIndex(schedule => schedule.id === scheduleId);
        if (index === -1) return null;

        const updatedSchedule: MaintenanceSchedule = {
            ...this.maintenanceSchedules[index],
            ...updates,
            updatedAt: new Date()
        };

        this.maintenanceSchedules[index] = updatedSchedule;
        return updatedSchedule;
    }

    getScheduleById(scheduleId: string): MaintenanceSchedule | null {
        return this.maintenanceSchedules.find(schedule => schedule.id === scheduleId) || null;
    }

    cancelSchedule(scheduleId: string): boolean {
        const index = this.maintenanceSchedules.findIndex(schedule => schedule.id === scheduleId);
        if (index === -1) return false;

        this.maintenanceSchedules.splice(index, 1);
        return true;
    }
}