import express from 'express';
import { setAssetsRoutes } from './routes/assetsRoutes';
import { setCloudIntegrationsRoutes } from './routes/cloudIntegrationsRoutes';
import { setMaintenanceRoutes } from './routes/maintenanceRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize routes
setAssetsRoutes(app);
setCloudIntegrationsRoutes(app);
setMaintenanceRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});