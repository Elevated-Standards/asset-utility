import { Request, Response } from 'express';
import { CloudProvider } from '../models/cloudProvider';

// Temporary in-memory storage (replace with database in production)
let integrations: CloudProvider[] = [];

export const integrateAWS = async (req: Request, res: Response) => {
    try {
        const newIntegration: CloudProvider = {
            ...req.body,
            id: Date.now().toString(),
            provider: 'aws',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        integrations.push(newIntegration);
        res.status(201).json(newIntegration);
    } catch (error) {
        res.status(400).json({ error: 'Invalid AWS integration data' });
    }
};

export const integrateAzure = async (req: Request, res: Response) => {
    try {
        const newIntegration: CloudProvider = {
            ...req.body,
            id: Date.now().toString(),
            provider: 'azure',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        integrations.push(newIntegration);
        res.status(201).json(newIntegration);
    } catch (error) {
        res.status(400).json({ error: 'Invalid Azure integration data' });
    }
};

export const listIntegrations = async (req: Request, res: Response) => {
    res.json(integrations);
};

export const removeIntegration = async (req: Request, res: Response) => {
    const provider = req.params.provider.toLowerCase();
    const index = integrations.findIndex(i => i.provider === provider);
    if (index === -1) {
        return res.status(404).json({ error: 'Integration not found' });
    }
    
    integrations.splice(index, 1);
    res.status(204).send();
};