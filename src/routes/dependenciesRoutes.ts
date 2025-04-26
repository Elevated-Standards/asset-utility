import { Router } from 'express';
import {
    addDependency,
    getAllDependencies,
    getDependenciesForAsset,
    removeDependency
} from '../controllers/dependenciesController';

const router = Router();

router.post('/', addDependency);
router.get('/', getAllDependencies);
router.get('/:id', getDependenciesForAsset);
router.delete('/:id', removeDependency);

export default router;