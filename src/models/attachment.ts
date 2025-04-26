export interface Attachment {
    id: string;
    assetId: string;
    name: string;
    type: string;
    size: number;
    path: string;
    uploadedBy: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}