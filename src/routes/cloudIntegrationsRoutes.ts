import { Router } from 'express';
import { CloudIntegrationsController } from '../controllers/cloudIntegrationsController';

const router = Router();
const cloudIntegrationsController = new CloudIntegrationsController();

export function setCloudIntegrationsRoutes(app: Router) {
    app.post('/integrate/aws', cloudIntegrationsController.integrateAWS.bind(cloudIntegrationsController));
    app.post('/integrate/azure', cloudIntegrationsController.integrateAzure.bind(cloudIntegrationsController));
    app.get('/integrations', cloudIntegrationsController.listIntegrations.bind(cloudIntegrationsController));
}