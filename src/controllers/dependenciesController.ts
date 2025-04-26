import { Request, Response } from 'express';
import { AssetDependency } from '../models/assetDependency';

// Temporary in-memory storage (replace with database in production)
let dependencies: AssetDependency[] = [];

export const addDependency = async (req: Request, res: Response) => {
    try {
        const newDependency: AssetDependency = {
            ...req.body,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        dependencies.push(newDependency);
        res.status(201).json(newDependency);
    } catch (error) {
        res.status(400).json({ error: 'Invalid dependency data' });
    }
};

export const getAllDependencies = async (req: Request, res: Response) => {
    res.json(dependencies);
};

export const getDependenciesForAsset = async (req: Request, res: Response) => {
    const assetId = req.params.id;
    const assetDependencies = dependencies.filter(
        d => d.sourceAssetId === assetId || d.targetAssetId === assetId
    );
    res.json(assetDependencies);
};

export const removeDependency = async (req: Request, res: Response) => {
    const index = dependencies.findIndex(d => d.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Dependency not found' });
    }
    
    dependencies.splice(index, 1);
    res.status(204).send();
};