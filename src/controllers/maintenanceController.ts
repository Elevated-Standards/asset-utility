import { Request, Response } from 'express';
import { MaintenanceSchedule } from '../models/maintenanceSchedule';

// Temporary in-memory storage (replace with database in production)
let maintenanceSchedules: MaintenanceSchedule[] = [];
let maintenanceHistory: MaintenanceSchedule[] = [];

export const scheduleMaintenance = async (req: Request, res: Response) => {
    try {
        const newSchedule: MaintenanceSchedule = {
            ...req.body,
            id: Date.now().toString(),
            status: 'scheduled',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        maintenanceSchedules.push(newSchedule);
        res.status(201).json(newSchedule);
    } catch (error) {
        res.status(400).json({ error: 'Invalid maintenance schedule data' });
    }
};

export const getAllMaintenance = async (req: Request, res: Response) => {
    res.json(maintenanceSchedules);
};

export const getMaintenanceHistory = async (req: Request, res: Response) => {
    res.json(maintenanceHistory);
};

export const getMaintenanceById = async (req: Request, res: Response) => {
    const schedule = maintenanceSchedules.find(m => m.id === req.params.id);
    if (!schedule) {
        return res.status(404).json({ error: 'Maintenance schedule not found' });
    }
    res.json(schedule);
};

export const updateMaintenance = async (req: Request, res: Response) => {
    const index = maintenanceSchedules.findIndex(m => m.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Maintenance schedule not found' });
    }

    const updatedSchedule: MaintenanceSchedule = {
        ...maintenanceSchedules[index],
        ...req.body,
        id: req.params.id,
        updatedAt: new Date()
    };

    if (updatedSchedule.status === 'completed') {
        maintenanceHistory.push(updatedSchedule);
        maintenanceSchedules.splice(index, 1);
    } else {
        maintenanceSchedules[index] = updatedSchedule;
    }

    res.json(updatedSchedule);
};

export const cancelMaintenance = async (req: Request, res: Response) => {
    const index = maintenanceSchedules.findIndex(m => m.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Maintenance schedule not found' });
    }

    const cancelledSchedule: MaintenanceSchedule = {
        ...maintenanceSchedules[index],
        status: 'cancelled' as const,
        updatedAt: new Date()
    };

    maintenanceHistory.push(cancelledSchedule);
    maintenanceSchedules.splice(index, 1);
    res.status(204).send();
};