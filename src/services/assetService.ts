import { Asset } from '../models/asset';
import { AssetNotFoundError } from '../utils/errors';
import { generateId } from '../utils/helpers';

/**
 * Service for managing assets and their lifecycle.
 * Handles creation, updates, deletion, and retrieval of assets.
 */
export class AssetService {
    private assets: Asset[] = [];

    /**
     * Creates a new asset.
     * 
     * @param assetData - Initial asset data
     * @returns The created asset
     */
    async createAsset(assetData: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>): Promise<Asset> {
        const now = new Date();
        const asset: Asset = {
            ...assetData,
            id: generateId('asset-'),
            createdAt: now,
            updatedAt: now
        };
        
        this.assets.push(asset);
        return asset;
    }

    /**
     * Retrieves an asset by its ID.
     * 
     * @param id - The asset ID to look up
     * @returns The found asset
     * @throws {AssetNotFoundError} If the asset doesn't exist
     */
    async getAssetById(id: string): Promise<Asset> {
        const asset = this.assets.find(a => a.id === id);
        if (!asset) {
            throw new AssetNotFoundError(id);
        }
        return asset;
    }

    /**
     * Updates an existing asset.
     * 
     * @param id - ID of the asset to update
     * @param updates - The fields to update and their new values
     * @returns The updated asset
     * @throws {AssetNotFoundError} If the asset doesn't exist
     */
    async updateAsset(id: string, updates: Partial<Asset>): Promise<Asset> {
        const index = this.assets.findIndex(a => a.id === id);
        if (index === -1) {
            throw new AssetNotFoundError(id);
        }

        const updatedAsset: Asset = {
            ...this.assets[index],
            ...updates,
            id, // Ensure ID doesn't change
            updatedAt: new Date()
        };

        this.assets[index] = updatedAsset;
        return updatedAsset;
    }

    /**
     * Deletes an asset by its ID.
     * 
     * @param id - ID of the asset to delete
     * @throws {AssetNotFoundError} If the asset doesn't exist
     */
    async deleteAsset(id: string): Promise<void> {
        const index = this.assets.findIndex(a => a.id === id);
        if (index === -1) {
            throw new AssetNotFoundError(id);
        }

        this.assets.splice(index, 1);
    }

    /**
     * Retrieves all assets.
     * 
     * @returns Array of all assets
     */
    async getAllAssets(): Promise<Asset[]> {
        return [...this.assets];
    }
}