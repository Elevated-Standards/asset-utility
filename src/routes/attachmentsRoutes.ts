import { Router } from 'express';
import {
    createAttachment,
    getAllAttachments,
    getAttachmentById,
    deleteAttachment
} from '../controllers/attachmentsController';

const router = Router();

router.post('/', createAttachment);
router.get('/', getAllAttachments);
router.get('/:id', getAttachmentById);
router.delete('/:id', deleteAttachment);

export default router;