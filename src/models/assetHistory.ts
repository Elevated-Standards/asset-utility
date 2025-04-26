/**
 * Represents a historical change record for an asset.
 * Tracks modifications to assets and their related entities.
 */
export interface AssetHistory {
    /** Unique identifier for the history record */
    id: string;

    /** ID of the asset that was changed */
    assetId: string;

    /** Type of change that occurred */
    changeType: 'create' | 'update' | 'delete' | 'configuration' | 'maintenance' | 'dependency';

    /** List of specific field changes */
    changes: {
        /** Name of the field that changed */
        field: string;
        /** Previous value of the field */
        oldValue: any;
        /** New value of the field */
        newValue: any;
    }[];

    /** ID or name of the user/system that made the change */
    changedBy: string;

    /** When the change occurred */
    timestamp: Date;

    /** Optional notes about the change */
    comment?: string;
}