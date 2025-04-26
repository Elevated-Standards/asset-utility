/**
 * Represents a cloud service provider integration configuration.
 */
export interface CloudProvider {
    /** Unique identifier for the integration */
    id: string;

    /** Type of cloud provider */
    provider: 'aws' | 'azure';

    /** Authentication credentials for the cloud provider */
    credentials: {
        /** AWS access key ID */
        accessKey?: string;
        /** AWS secret access key */
        secretKey?: string;
        /** Azure tenant ID */
        tenantId?: string;
        /** Azure client ID */
        clientId?: string;
        /** Azure client secret */
        clientSecret?: string;
    };

    /** Cloud provider region (e.g., 'us-east-1', 'eastus') */
    region: string;

    /** Current status of the integration */
    status: 'active' | 'inactive';

    /** Timestamp when the integration was created */
    createdAt: Date;

    /** Timestamp when the integration was last updated */
    updatedAt: Date;
}