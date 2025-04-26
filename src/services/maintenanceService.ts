import { MaintenanceSchedule } from '../models/maintenanceSchedule';
import { MaintenanceScheduleNotFoundError } from '../utils/errors';

/**
 * Service for managing maintenance schedules for assets.
 * Handles scheduling, updating, and cancelling maintenance activities.
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
     * @param details.title - Short description of the maintenance
     * @param details.description - Detailed description of what needs to be done
     * @param details.type - Type of maintenance (preventive/corrective/predictive)
     * @param details.assignedTo - ID or name of person/team assigned
     * @param details.priority - Importance level of the maintenance
     * @param details.notes - Optional additional notes
     * @returns The created maintenance schedule
     */
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

    /**
     * Retrieves all maintenance schedules for a specific asset.
     * 
     * @param assetId - The ID of the asset to get maintenance history for
     * @returns Array of maintenance schedules for the asset
     */
    getMaintenanceHistory(assetId: string): MaintenanceSchedule[] {
        return this.maintenanceSchedules.filter(schedule => schedule.assetId === assetId);
    }

    /**
     * Updates an existing maintenance schedule.
     * 
     * @param scheduleId - The ID of the maintenance schedule to update
     * @param updates - The fields to update and their new values
     * @returns The updated schedule
     * @throws {MaintenanceScheduleNotFoundError} If schedule is not found
     */
    updateMaintenanceSchedule(scheduleId: string, updates: Partial<MaintenanceSchedule>): MaintenanceSchedule {
        const index = this.maintenanceSchedules.findIndex(schedule => schedule.id === scheduleId);
        if (index === -1) {
            throw new MaintenanceScheduleNotFoundError(scheduleId);
        }

        const updatedSchedule: MaintenanceSchedule = {
            ...this.maintenanceSchedules[index],
            ...updates,
            updatedAt: new Date()
        };

        this.maintenanceSchedules[index] = updatedSchedule;
        return updatedSchedule;
    }

    /**
     * Retrieves a specific maintenance schedule by its ID.
     * 
     * @param scheduleId - The ID of the maintenance schedule to find
     * @returns The maintenance schedule
     * @throws {MaintenanceScheduleNotFoundError} If schedule is not found
     */
    getScheduleById(scheduleId: string): MaintenanceSchedule {
        const schedule = this.maintenanceSchedules.find(schedule => schedule.id === scheduleId);
        if (!schedule) {
            throw new MaintenanceScheduleNotFoundError(scheduleId);
        }
        return schedule;
    }

    /**
     * Cancels a maintenance schedule.
     * 
     * @param scheduleId - The ID of the maintenance schedule to cancel
     * @throws {MaintenanceScheduleNotFoundError} If schedule is not found
     */
    cancelSchedule(scheduleId: string): void {
        const index = this.maintenanceSchedules.findIndex(schedule => schedule.id === scheduleId);
        if (index === -1) {
            throw new MaintenanceScheduleNotFoundError(scheduleId);
        }

        this.maintenanceSchedules.splice(index, 1);
    }
}