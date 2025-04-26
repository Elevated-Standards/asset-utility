import { MaintenanceSchedule } from '../models/maintenanceSchedule';
import { MaintenanceScheduleNotFoundError } from '../utils/errors';
import { generateId } from '../utils/helpers';

/**
 * Service for managing maintenance schedules and activities.
 * Handles scheduling, updating, and tracking maintenance for assets.
 */
export class MaintenanceService {
    private maintenanceSchedules: MaintenanceSchedule[] = [];

    /**
     * Creates a new maintenance schedule for an asset.
     * 
     * @param assetId - The ID of the asset requiring maintenance
     * @param startDate - When the maintenance should begin
     * @param endDate - When the maintenance should be completed
     * @param details - Additional details about the maintenance activity
     * @returns The created maintenance schedule
     */
    scheduleMaintenance(
        assetId: string,
        startDate: Date,
        endDate: Date,
        details: {
            title: string;
            description: string;
            type: 'preventive' | 'corrective' | 'predictive';
            assignedTo: string;
            priority: 'low' | 'medium' | 'high' | 'critical';
            notes?: string;
        }
    ): MaintenanceSchedule {
        const now = new Date();
        const schedule: MaintenanceSchedule = {
            id: generateId('maint-'),
            assetId,
            startDate,
            endDate,
            status: 'scheduled',
            ...details,
            createdAt: now,
            updatedAt: now
        };

        this.maintenanceSchedules.push(schedule);
        return schedule;
    }

    /**
     * Retrieves all maintenance schedules for a specific asset.
     * 
     * @param assetId - The ID of the asset to get maintenance history for
     * @returns Array of maintenance schedules for the asset
     */
    getMaintenanceHistory(assetId: string): MaintenanceSchedule[] {
        return this.maintenanceSchedules.filter(
            schedule => schedule.assetId === assetId
        );
    }

    /**
     * Retrieves a specific maintenance schedule by its ID.
     * 
     * @param scheduleId - The ID of the maintenance schedule to find
     * @returns The maintenance schedule
     * @throws {MaintenanceScheduleNotFoundError} If schedule is not found
     */
    getScheduleById(scheduleId: string): MaintenanceSchedule {
        const schedule = this.maintenanceSchedules.find(s => s.id === scheduleId);
        if (!schedule) {
            throw new MaintenanceScheduleNotFoundError(scheduleId);
        }
        return schedule;
    }

    /**
     * Updates an existing maintenance schedule.
     * 
     * @param scheduleId - The ID of the maintenance schedule to update
     * @param updates - The fields to update and their new values
     * @returns The updated schedule
     * @throws {MaintenanceScheduleNotFoundError} If schedule is not found
     */
    updateMaintenanceSchedule(
        scheduleId: string,
        updates: Partial<MaintenanceSchedule>
    ): MaintenanceSchedule {
        const index = this.maintenanceSchedules.findIndex(s => s.id === scheduleId);
        if (index === -1) {
            throw new MaintenanceScheduleNotFoundError(scheduleId);
        }

        const updatedSchedule: MaintenanceSchedule = {
            ...this.maintenanceSchedules[index],
            ...updates,
            id: scheduleId,
            updatedAt: new Date()
        };

        this.maintenanceSchedules[index] = updatedSchedule;
        return updatedSchedule;
    }

    /**
     * Cancels a maintenance schedule.
     * 
     * @param scheduleId - The ID of the maintenance schedule to cancel
     * @throws {MaintenanceScheduleNotFoundError} If schedule is not found
     */
    cancelSchedule(scheduleId: string): void {
        const index = this.maintenanceSchedules.findIndex(s => s.id === scheduleId);
        if (index === -1) {
            throw new MaintenanceScheduleNotFoundError(scheduleId);
        }

        this.maintenanceSchedules.splice(index, 1);
    }
}