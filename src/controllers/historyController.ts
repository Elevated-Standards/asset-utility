import { Request, Response } from 'express';
import { AssetHistory } from '../models/assetHistory';

// Temporary in-memory storage (replace with database in production)
let assetHistory: AssetHistory[] = [];

export const getAllAssetHistory = async (req: Request, res: Response) => {
    res.json(assetHistory);
};

export const getAssetHistoryById = async (req: Request, res: Response) => {
    const history = assetHistory.filter(h => h.assetId === req.params.id);
    if (history.length === 0) {
        return res.status(404).json({ error: 'No history found for this asset' });
    }
    res.json(history);
};

// Internal function to record changes
export const recordChange = (change: Omit<AssetHistory, 'id' | 'timestamp'>) => {
    const historyEntry: AssetHistory = {
        ...change,
        id: Date.now().toString(),
        timestamp: new Date()
    };
    assetHistory.push(historyEntry);
    return historyEntry;
};