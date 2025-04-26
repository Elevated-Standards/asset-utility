export interface AssetConfiguration {
    id: string;
    assetId: string;
    name: string;
    version: string;
    settings: Record<string, any>;
    compliance: {
        status: 'compliant' | 'non-compliant' | 'pending';
        lastChecked: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}