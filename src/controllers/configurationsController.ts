import { Request, Response } from 'express';
import { AssetConfiguration } from '../models/assetConfiguration';

// Temporary in-memory storage (replace with database in production)
let configurations: AssetConfiguration[] = [];

export const createConfiguration = async (req: Request, res: Response) => {
    try {
        const newConfig: AssetConfiguration = {
            ...req.body,
            id: Date.now().toString(),
            compliance: {
                status: 'pending',
                lastChecked: new Date()
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        configurations.push(newConfig);
        res.status(201).json(newConfig);
    } catch (error) {
        res.status(400).json({ error: 'Invalid configuration data' });
    }
};

export const getAllConfigurations = async (req: Request, res: Response) => {
    res.json(configurations);
};

export const getConfigurationById = async (req: Request, res: Response) => {
    const config = configurations.find(c => c.id === req.params.id);
    if (!config) {
        return res.status(404).json({ error: 'Configuration not found' });
    }
    res.json(config);
};

export const updateConfiguration = async (req: Request, res: Response) => {
    const index = configurations.findIndex(c => c.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Configuration not found' });
    }

    configurations[index] = {
        ...configurations[index],
        ...req.body,
        id: req.params.id,
        updatedAt: new Date()
    };

    res.json(configurations[index]);
};

export const deleteConfiguration = async (req: Request, res: Response) => {
    const index = configurations.findIndex(c => c.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Configuration not found' });
    }
    
    configurations.splice(index, 1);
    res.status(204).send();
};