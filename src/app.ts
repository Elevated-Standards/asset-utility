import express from 'express';
import { json } from 'express';
import assetsRoutes from './routes/assetsRoutes';
import cloudIntegrationsRoutes from './routes/cloudIntegrationsRoutes';
import maintenanceRoutes from './routes/maintenanceRoutes';
import dependenciesRoutes from './routes/dependenciesRoutes';
import configurationsRoutes from './routes/configurationsRoutes';
import historyRoutes from './routes/historyRoutes';
import attachmentsRoutes from './routes/attachmentsRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(json());

// Routes
app.use('/assets', assetsRoutes);
app.use('/integrations', cloudIntegrationsRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use('/dependencies', dependenciesRoutes);
app.use('/configurations', configurationsRoutes);
app.use('/history', historyRoutes);
app.use('/attachments', attachmentsRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});