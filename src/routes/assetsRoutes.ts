import { Router } from 'express';
import AssetsController from '../controllers/assetsController';

const router = Router();
const assetsController = new AssetsController();

router.post('/assets', assetsController.createAsset.bind(assetsController));
router.get('/assets/:id', assetsController.getAsset.bind(assetsController));
router.put('/assets/:id', assetsController.updateAsset.bind(assetsController));
router.delete('/assets/:id', assetsController.deleteAsset.bind(assetsController));

export default function setAssetsRoutes(app) {
    app.use('/api', router);
}