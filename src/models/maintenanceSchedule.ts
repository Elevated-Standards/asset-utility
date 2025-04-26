/**
 * Represents a scheduled maintenance activity for an asset.
 */
export interface MaintenanceSchedule {
    /** Unique identifier for the maintenance schedule */
    id: string;

    /** ID of the asset requiring maintenance */
    assetId: string;

    /** Short description of the maintenance activity */
    title: string;

    /** Detailed description of what needs to be done */
    description: string;

    /** When the maintenance activity should begin */
    startDate: Date;

    /** When the maintenance activity should be completed */
    endDate: Date;

    /** Current status of the maintenance activity */
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

    /** Type of maintenance being performed */
    type: 'preventive' | 'corrective' | 'predictive';

    /** ID or name of person/team assigned to perform the maintenance */
    assignedTo: string;

    /** Importance level of the maintenance activity */
    priority: 'low' | 'medium' | 'high' | 'critical';

    /** Optional additional notes or instructions */
    notes?: string;

    /** Timestamp when the schedule was created */
    createdAt: Date;

    /** Timestamp when the schedule was last updated */
    updatedAt: Date;
}