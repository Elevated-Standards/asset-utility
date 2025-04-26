import { AssetDependency } from '../models/assetDependency';
import { AssetNotFoundError } from '../utils/errors';
import { generateId } from '../utils/helpers';

/**
 * Service for managing dependencies between assets.
 * Handles creating, updating, and removing relationships between assets.
 */
export class DependencyService {
    private dependencies: AssetDependency[] = [];

    /**
     * Creates a new dependency relationship between assets.
     * 
     * @param dependencyData - The dependency relationship details
     * @returns The created dependency
     */
    async addDependency(dependencyData: Omit<AssetDependency, 'id' | 'createdAt' | 'updatedAt'>): Promise<AssetDependency> {
        const now = new Date();
        const dependency: AssetDependency = {
            ...dependencyData,
            id: generateId('dep-'),
            createdAt: now,
            updatedAt: now
        };

        this.dependencies.push(dependency);
        return dependency;
    }

    /**
     * Retrieves all dependencies for a specific asset.
     * Includes both dependencies where the asset is the source or target.
     * 
     * @param assetId - ID of the asset to find dependencies for
     * @returns Array of dependencies involving the asset
     */
    async getDependenciesForAsset(assetId: string): Promise<AssetDependency[]> {
        return this.dependencies.filter(
            dep => dep.sourceAssetId === assetId || dep.targetAssetId === assetId
        );
    }

    /**
     * Updates an existing dependency relationship.
     * 
     * @param id - ID of the dependency to update
     * @param updates - The fields to update and their new values
     * @returns The updated dependency
     * @throws {AssetNotFoundError} If the dependency doesn't exist
     */
    async updateDependency(id: string, updates: Partial<AssetDependency>): Promise<AssetDependency> {
        const index = this.dependencies.findIndex(dep => dep.id === id);
        if (index === -1) {
            throw new AssetNotFoundError(`Dependency ${id} not found`);
        }

        const updatedDependency: AssetDependency = {
            ...this.dependencies[index],
            ...updates,
            id,
            updatedAt: new Date()
        };

        this.dependencies[index] = updatedDependency;
        return updatedDependency;
    }

    /**
     * Retrieves all dependency relationships.
     * 
     * @returns Array of all dependencies
     */
    async getAllDependencies(): Promise<AssetDependency[]> {
        return [...this.dependencies];
    }

    /**
     * Removes a dependency relationship.
     * 
     * @param id - ID of the dependency to remove
     * @throws {AssetNotFoundError} If the dependency doesn't exist
     */
    async removeDependency(id: string): Promise<void> {
        const index = this.dependencies.findIndex(dep => dep.id === id);
        if (index === -1) {
            throw new AssetNotFoundError(`Dependency ${id} not found`);
        }

        this.dependencies.splice(index, 1);
    }
}