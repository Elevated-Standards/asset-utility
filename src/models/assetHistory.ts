export interface AssetHistory {
    id: string;
    assetId: string;
    changeType: 'create' | 'update' | 'delete' | 'configuration' | 'maintenance' | 'dependency';
    changes: {
        field: string;
        oldValue: any;
        newValue: any;
    }[];
    changedBy: string;
    timestamp: Date;
    comment?: string;
}