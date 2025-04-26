import { Router } from 'express';
import {
    createConfiguration,
    getAllConfigurations,
    getConfigurationById,
    updateConfiguration,
    deleteConfiguration
} from '../controllers/configurationsController';

const router = Router();

router.post('/', createConfiguration);
router.get('/', getAllConfigurations);
router.get('/:id', getConfigurationById);
router.put('/:id', updateConfiguration);
router.delete('/:id', deleteConfiguration);

export default router;