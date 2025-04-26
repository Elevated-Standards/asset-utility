import { Router } from 'express';
import { integrateAWS, integrateAzure, listIntegrations, removeIntegration } from '../controllers/cloudIntegrationsController';

const router = Router();

router.post('/aws', integrateAWS);
router.post('/azure', integrateAzure);
router.get('/', listIntegrations);
router.delete('/:provider', removeIntegration);

export default router;