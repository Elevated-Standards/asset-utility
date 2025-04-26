export interface AssetDependency {
    id: string;
    sourceAssetId: string;
    targetAssetId: string;
    type: 'requires' | 'depends-on' | 'related-to';
    description?: string;
    impact: 'low' | 'medium' | 'high' | 'critical';
    createdAt: Date;
    updatedAt: Date;
}