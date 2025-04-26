import { AssetService } from '../assetService';
import { AssetNotFoundError } from '../../utils/errors';
import { Asset } from '../../models/asset';

describe('AssetService', () => {
  let service: AssetService;
  let mockAsset: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>;

  beforeEach(() => {
    service = new AssetService();
    mockAsset = {
      name: 'Test Server',
      type: 'server',
      status: 'active',
      location: 'us-east-1',
      provider: 'aws',
      configuration: {
        instanceType: 't3.micro',
        os: 'linux'
      }
    };
  });

  describe('createAsset', () => {
    it('should create a new asset', async () => {
      const result = await service.createAsset(mockAsset);

      expect(result).toMatchObject(mockAsset);
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('getAssetById', () => {
    it('should return an asset by id', async () => {
      const asset = await service.createAsset(mockAsset);
      const found = await service.getAssetById(asset.id);
      expect(found).toEqual(asset);
    });

    it('should throw AssetNotFoundError for non-existent asset', async () => {
      await expect(service.getAssetById('non-existent'))
        .rejects
        .toThrow(AssetNotFoundError);
    });
  });

  describe('updateAsset', () => {
    it('should update an existing asset', async () => {
      const asset = await service.createAsset(mockAsset);
      const updates = {
        status: 'maintenance' as const,
        configuration: {
          ...asset.configuration,
          maintenance: true
        }
      };

      const updated = await service.updateAsset(asset.id, updates);
      expect(updated.status).toBe('maintenance');
      expect(updated.configuration.maintenance).toBe(true);
      expect(updated.updatedAt).not.toEqual(asset.updatedAt);
    });

    it('should throw AssetNotFoundError when updating non-existent asset', async () => {
      await expect(service.updateAsset('non-existent', { status: 'active' }))
        .rejects
        .toThrow(AssetNotFoundError);
    });
  });

  describe('deleteAsset', () => {
    it('should delete an existing asset', async () => {
      const asset = await service.createAsset(mockAsset);
      await service.deleteAsset(asset.id);

      await expect(service.getAssetById(asset.id))
        .rejects
        .toThrow(AssetNotFoundError);
    });

    it('should throw AssetNotFoundError when deleting non-existent asset', async () => {
      await expect(service.deleteAsset('non-existent'))
        .rejects
        .toThrow(AssetNotFoundError);
    });
  });

  describe('getAllAssets', () => {
    it('should return all assets', async () => {
      const asset1 = await service.createAsset(mockAsset);
      const asset2 = await service.createAsset({
        ...mockAsset,
        name: 'Test Server 2'
      });

      const assets = await service.getAllAssets();
      expect(assets).toHaveLength(2);
      expect(assets).toEqual(expect.arrayContaining([asset1, asset2]));
    });

    it('should return empty array when no assets exist', async () => {
      const assets = await service.getAllAssets();
      expect(assets).toHaveLength(0);
    });
  });
});