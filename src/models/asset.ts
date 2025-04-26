/**
 * Represents an infrastructure or application asset.
 */
export interface Asset {
    /** Unique identifier for the asset */
    id: string;

    /** Human-readable name of the asset */
    name: string;

    /** Type of asset (e.g., 'server', 'database', 'storage') */
    type: string;

    /** Current operational status of the asset */
    status: 'active' | 'inactive' | 'maintenance';

    /** Physical or logical location of the asset */
    location: string;

    /** Cloud service provider hosting the asset, if applicable */
    provider?: 'aws' | 'azure' | 'other';

    /** Provider-specific or custom configuration settings */
    configuration: Record<string, any>;

    /** Timestamp when the asset was created */
    createdAt: Date;

    /** Timestamp when the asset was last updated */
    updatedAt: Date;
}