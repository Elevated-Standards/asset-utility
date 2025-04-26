/**
 * Represents a document or file attached to an asset.
 * Used for storing related documentation, images, or other files.
 */
export interface Attachment {
    /** Unique identifier for the attachment */
    id: string;

    /** ID of the asset this attachment belongs to */
    assetId: string;

    /** Original filename of the attachment */
    name: string;

    /** MIME type or file extension */
    type: string;

    /** File size in bytes */
    size: number;

    /** Storage location or path of the file */
    path: string;

    /** ID or name of the user who uploaded the file */
    uploadedBy: string;

    /** Optional description of the attachment's contents or purpose */
    description?: string;

    /** Timestamp when the attachment was created */
    createdAt: Date;

    /** Timestamp when the attachment was last updated */
    updatedAt: Date;
}