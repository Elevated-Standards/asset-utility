import { Request, Response } from 'express';
import { Asset } from '../models/asset';

// Temporary in-memory storage (replace with database in production)
let assets: Asset[] = [];

export const createAsset = async (req: Request, res: Response) => {
    try {
        const newAsset: Asset = {
            ...req.body,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        assets.push(newAsset);
        res.status(201).json(newAsset);
    } catch (error) {
        res.status(400).json({ error: 'Invalid asset data' });
    }
};

export const getAllAssets = async (req: Request, res: Response) => {
    res.json(assets);
};

export const getAssetById = async (req: Request, res: Response) => {
    const asset = assets.find(a => a.id === req.params.id);
    if (!asset) {
        return res.status(404).json({ error: 'Asset not found' });
    }
    res.json(asset);
};

export const updateAsset = async (req: Request, res: Response) => {
    const index = assets.findIndex(a => a.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Asset not found' });
    }
    
    assets[index] = {
        ...assets[index],
        ...req.body,
        id: req.params.id,
        updatedAt: new Date()
    };
    
    res.json(assets[index]);
};

export const deleteAsset = async (req: Request, res: Response) => {
    const index = assets.findIndex(a => a.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Asset not found' });
    }
    
    assets.splice(index, 1);
    res.status(204).send();
};