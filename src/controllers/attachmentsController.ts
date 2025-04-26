import { Request, Response } from 'express';
import { Attachment } from '../models/attachment';

// Temporary in-memory storage (replace with database in production)
let attachments: Attachment[] = [];

export const createAttachment = async (req: Request, res: Response) => {
    try {
        const newAttachment: Attachment = {
            ...req.body,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        attachments.push(newAttachment);
        res.status(201).json(newAttachment);
    } catch (error) {
        res.status(400).json({ error: 'Invalid attachment data' });
    }
};

export const getAllAttachments = async (req: Request, res: Response) => {
    res.json(attachments);
};

export const getAttachmentById = async (req: Request, res: Response) => {
    const attachment = attachments.find(a => a.id === req.params.id);
    if (!attachment) {
        return res.status(404).json({ error: 'Attachment not found' });
    }
    res.json(attachment);
};

export const deleteAttachment = async (req: Request, res: Response) => {
    const index = attachments.findIndex(a => a.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Attachment not found' });
    }
    
    attachments.splice(index, 1);
    res.status(204).send();
};