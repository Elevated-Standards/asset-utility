export interface MaintenanceSchedule {
    id: string;
    assetId: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    type: 'preventive' | 'corrective' | 'predictive';
    assignedTo: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}