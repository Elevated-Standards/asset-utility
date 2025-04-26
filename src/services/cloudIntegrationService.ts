import { CloudProvider } from '../models/cloudProvider';
import { CloudIntegrationError, ConfigurationError } from '../utils/errors';
import { generateId, validateAwsCredentials, validateAzureCredentials } from '../utils/helpers';

/**
 * Service for managing cloud provider integrations.
 * Handles AWS and Azure cloud provider connections and credential management.
 */
export class CloudIntegrationService {
    private integrations: CloudProvider[] = [];

    /**
     * Integrates with AWS using provided configuration.
     * 
     * @param config - AWS configuration including region and credentials
     * @returns The created cloud provider integration
     * @throws {ConfigurationError} If credentials are invalid
     */
    async integrateAWS(config: {
        region: string;
        credentials: {
            accessKey?: string;
            secretKey?: string;
        };
    }): Promise<CloudProvider> {
        validateAwsCredentials(config.credentials);
        await this.validateCredentials('aws', config.credentials);

        const now = new Date();
        const integration: CloudProvider = {
            id: generateId('cloud-'),
            provider: 'aws',
            region: config.region,
            credentials: config.credentials,
            status: 'active',
            createdAt: now,
            updatedAt: now
        };

        this.integrations.push(integration);
        return integration;
    }

    /**
     * Integrates with Azure using provided configuration.
     * 
     * @param config - Azure configuration including region and credentials
     * @returns The created cloud provider integration
     * @throws {ConfigurationError} If credentials are invalid
     */
    async integrateAzure(config: {
        region: string;
        credentials: {
            tenantId?: string;
            clientId?: string;
            clientSecret?: string;
        };
    }): Promise<CloudProvider> {
        validateAzureCredentials(config.credentials);
        await this.validateCredentials('azure', config.credentials);

        const now = new Date();
        const integration: CloudProvider = {
            id: generateId('cloud-'),
            provider: 'azure',
            region: config.region,
            credentials: config.credentials,
            status: 'active',
            createdAt: now,
            updatedAt: now
        };

        this.integrations.push(integration);
        return integration;
    }

    /**
     * Lists all cloud provider integrations.
     * 
     * @returns Array of all cloud provider integrations
     */
    async listIntegrations(): Promise<CloudProvider[]> {
        return [...this.integrations];
    }

    /**
     * Removes a cloud provider integration.
     * 
     * @param id - ID of the integration to remove
     * @throws {CloudIntegrationError} If the integration doesn't exist
     */
    async removeIntegration(id: string): Promise<void> {
        const index = this.integrations.findIndex(i => i.id === id);
        if (index === -1) {
            throw new CloudIntegrationError('unknown', 'Integration not found');
        }

        this.integrations.splice(index, 1);
    }

    /**
     * Validates cloud provider credentials.
     * 
     * @param provider - The cloud provider type ('aws' or 'azure')
     * @param credentials - The credentials to validate
     * @returns True if credentials are valid
     * @throws {ConfigurationError} If credentials are invalid
     */
    async validateCredentials(
        provider: 'aws' | 'azure',
        credentials: Record<string, string | undefined>
    ): Promise<boolean> {
        try {
            if (provider === 'aws') {
                validateAwsCredentials(credentials);
                // Here you would typically make an AWS API call to validate
                // For now, we'll just return true if validation passes
            } else if (provider === 'azure') {
                validateAzureCredentials(credentials);
                // Here you would typically make an Azure API call to validate
                // For now, we'll just return true if validation passes
            }
            return true;
        } catch (error) {
            throw new ConfigurationError(`Invalid ${provider} credentials: ${error.message}`);
        }
    }
}