/**
 * Represents a configuration baseline for an asset.
 * Tracks settings and compliance status.
 */
export interface AssetConfiguration {
    /** Unique identifier for the configuration */
    id: string;

    /** ID of the asset this configuration belongs to */
    assetId: string;

    /** Human-readable name of the configuration */
    name: string;

    /** Version identifier for the configuration */
    version: string;

    /** Key-value pairs of configuration settings */
    settings: Record<string, any>;

    /** Compliance status information */
    compliance: {
        /** Current compliance state */
        status: 'compliant' | 'non-compliant' | 'pending';
        /** When compliance was last verified */
        lastChecked: Date;
    };

    /** Timestamp when the configuration was created */
    createdAt: Date;

    /** Timestamp when the configuration was last updated */
    updatedAt: Date;
}