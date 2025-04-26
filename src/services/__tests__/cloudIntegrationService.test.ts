import { CloudIntegrationService } from '../cloudIntegrationService';
import { CloudIntegrationError, ConfigurationError } from '../../utils/errors';
import { CloudProvider } from '../../models/cloudProvider';

describe('CloudIntegrationService', () => {
  let service: CloudIntegrationService;
  let mockAwsConfig: {
    region: string;
    credentials: {
      accessKey: string;
      secretKey: string;
    };
  };
  let mockAzureConfig: {
    region: string;
    credentials: {
      tenantId: string;
      clientId: string;
      clientSecret: string;
    };
  };

  beforeEach(() => {
    service = new CloudIntegrationService();
    mockAwsConfig = {
      region: 'us-east-1',
      credentials: {
        accessKey: 'test-access-key',
        secretKey: 'test-secret-key'
      }
    };
    mockAzureConfig = {
      region: 'eastus',
      credentials: {
        tenantId: 'test-tenant-id',
        clientId: 'test-client-id',
        clientSecret: 'test-client-secret'
      }
    };
  });

  describe('integrateAWS', () => {
    it('should create an AWS integration', async () => {
      const result = await service.integrateAWS(mockAwsConfig);

      expect(result).toMatchObject({
        provider: 'aws',
        region: mockAwsConfig.region,
        credentials: mockAwsConfig.credentials,
        status: 'active'
      });
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw ConfigurationError if credentials are missing', async () => {
      const invalidConfig = { region: 'us-east-1', credentials: {} };
      await expect(service.integrateAWS(invalidConfig))
        .rejects
        .toThrow(ConfigurationError);
    });
  });

  describe('integrateAzure', () => {
    it('should create an Azure integration', async () => {
      const result = await service.integrateAzure(mockAzureConfig);

      expect(result).toMatchObject({
        provider: 'azure',
        region: mockAzureConfig.region,
        credentials: mockAzureConfig.credentials,
        status: 'active'
      });
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw ConfigurationError if credentials are missing', async () => {
      const invalidConfig = { region: 'eastus', credentials: {} };
      await expect(service.integrateAzure(invalidConfig))
        .rejects
        .toThrow(ConfigurationError);
    });
  });

  describe('listIntegrations', () => {
    it('should return all cloud integrations', async () => {
      const aws = await service.integrateAWS(mockAwsConfig);
      const azure = await service.integrateAzure(mockAzureConfig);

      const integrations = await service.listIntegrations();
      expect(integrations).toHaveLength(2);
      expect(integrations).toEqual(expect.arrayContaining([aws, azure]));
    });

    it('should return empty array when no integrations exist', async () => {
      const integrations = await service.listIntegrations();
      expect(integrations).toHaveLength(0);
    });
  });

  describe('removeIntegration', () => {
    it('should remove an existing integration', async () => {
      const aws = await service.integrateAWS(mockAwsConfig);
      await service.removeIntegration(aws.id);

      const integrations = await service.listIntegrations();
      expect(integrations).not.toContainEqual(aws);
    });

    it('should throw CloudIntegrationError when removing non-existent integration', async () => {
      await expect(service.removeIntegration('non-existent'))
        .rejects
        .toThrow(CloudIntegrationError);
    });
  });

  describe('validateCredentials', () => {
    it('should validate AWS credentials successfully', async () => {
      const result = await service.validateCredentials('aws', mockAwsConfig.credentials);
      expect(result).toBe(true);
    });

    it('should validate Azure credentials successfully', async () => {
      const result = await service.validateCredentials('azure', mockAzureConfig.credentials);
      expect(result).toBe(true);
    });

    it('should throw ConfigurationError for invalid credentials', async () => {
      await expect(service.validateCredentials('aws', {}))
        .rejects
        .toThrow(ConfigurationError);
    });
  });
});