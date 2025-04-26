/**
 * Represents a dependency relationship between two assets.
 */
export interface AssetDependency {
    /** Unique identifier for the dependency */
    id: string;

    /** ID of the asset that depends on another asset */
    sourceAssetId: string;

    /** ID of the asset being depended upon */
    targetAssetId: string;

    /** Nature of the dependency relationship */
    type: 'requires' | 'depends-on' | 'related-to';

    /** Additional details about the dependency */
    description?: string;

    /** Severity of the dependency relationship */
    impact: 'low' | 'medium' | 'high' | 'critical';

    /** Timestamp when the dependency was created */
    createdAt: Date;

    /** Timestamp when the dependency was last updated */
    updatedAt: Date;
}