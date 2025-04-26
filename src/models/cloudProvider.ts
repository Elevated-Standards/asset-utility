export interface CloudProvider {
    id: string;
    provider: 'aws' | 'azure';
    credentials: {
        accessKey?: string;
        secretKey?: string;
        tenantId?: string;
        clientId?: string;
        clientSecret?: string;
    };
    region: string;
    status: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}