import { DependencyService } from '../dependencyService';
import { AssetDependency } from '../../models/assetDependency';
import { AssetNotFoundError } from '../../utils/errors';

describe('DependencyService', () => {
    let service: DependencyService;
    let mockDependency: Omit<AssetDependency, 'id' | 'createdAt' | 'updatedAt'>;

    beforeEach(() => {
        service = new DependencyService();
        mockDependency = {
            sourceAssetId: 'asset-123',
            targetAssetId: 'asset-456',
            type: 'requires',
            impact: 'high',
            description: 'Database requires cache server'
        };
    });

    describe('addDependency', () => {
        it('should create a new dependency', async () => {
            const result = await service.addDependency(mockDependency);

            expect(result).toMatchObject(mockDependency);
            expect(result.id).toBeDefined();
            expect(result.createdAt).toBeInstanceOf(Date);
            expect(result.updatedAt).toBeInstanceOf(Date);
        });

        it('should allow creating multiple dependencies for the same assets', async () => {
            const dep1 = await service.addDependency(mockDependency);
            const dep2 = await service.addDependency({
                ...mockDependency,
                type: 'related-to',
                description: 'Another relationship'
            });

            expect(dep1.id).not.toBe(dep2.id);
            const deps = await service.getDependenciesForAsset(mockDependency.sourceAssetId);
            expect(deps).toHaveLength(2);
        });
    });

    describe('getDependenciesForAsset', () => {
        it('should return dependencies where asset is source', async () => {
            const dependency = await service.addDependency(mockDependency);
            const deps = await service.getDependenciesForAsset(mockDependency.sourceAssetId);
            
            expect(deps).toHaveLength(1);
            expect(deps[0]).toEqual(dependency);
        });

        it('should return dependencies where asset is target', async () => {
            const dependency = await service.addDependency(mockDependency);
            const deps = await service.getDependenciesForAsset(mockDependency.targetAssetId);
            
            expect(deps).toHaveLength(1);
            expect(deps[0]).toEqual(dependency);
        });

        it('should return empty array for asset with no dependencies', async () => {
            const deps = await service.getDependenciesForAsset('non-existent');
            expect(deps).toHaveLength(0);
        });
    });

    describe('getAllDependencies', () => {
        it('should return all dependencies', async () => {
            const dep1 = await service.addDependency(mockDependency);
            const dep2 = await service.addDependency({
                ...mockDependency,
                sourceAssetId: 'asset-789',
                targetAssetId: 'asset-123'
            });

            const deps = await service.getAllDependencies();
            expect(deps).toHaveLength(2);
            expect(deps).toEqual(expect.arrayContaining([dep1, dep2]));
        });

        it('should return empty array when no dependencies exist', async () => {
            const deps = await service.getAllDependencies();
            expect(deps).toHaveLength(0);
        });
    });

    describe('removeDependency', () => {
        it('should remove an existing dependency', async () => {
            const dependency = await service.addDependency(mockDependency);
            await service.removeDependency(dependency.id);

            const deps = await service.getAllDependencies();
            expect(deps).toHaveLength(0);
        });

        it('should throw AssetNotFoundError when removing non-existent dependency', async () => {
            await expect(service.removeDependency('non-existent'))
                .rejects
                .toThrow(AssetNotFoundError);
        });
    });

    describe('updateDependency', () => {
        it('should update an existing dependency', async () => {
            const dependency = await service.addDependency(mockDependency);
            const updates = {
                impact: 'critical' as const,
                description: 'Updated description'
            };

            const updated = await service.updateDependency(dependency.id, updates);
            expect(updated.impact).toBe('critical');
            expect(updated.description).toBe('Updated description');
            expect(updated.updatedAt).not.toEqual(dependency.updatedAt);
        });

        it('should throw AssetNotFoundError when updating non-existent dependency', async () => {
            await expect(service.updateDependency('non-existent', { impact: 'low' }))
                .rejects
                .toThrow(AssetNotFoundError);
        });
    });
});