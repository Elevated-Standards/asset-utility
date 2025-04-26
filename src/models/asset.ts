export interface Asset {
    id: string;
    name: string;
    type: string;
    status: 'active' | 'inactive' | 'maintenance';
    location: string;
    provider?: 'aws' | 'azure' | 'other';
    configuration: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}