// Models
export * from './models/asset';
export * from './models/assetConfiguration';
export * from './models/assetDependency';
export * from './models/assetHistory';
export * from './models/attachment';
export * from './models/cloudProvider';
export * from './models/maintenanceSchedule';

// Services
export { MaintenanceService } from './services/maintenanceService';
export { AssetService } from './services/assetService';
export { CloudIntegrationService } from './services/cloudIntegrationService';

// Express middleware and route handlers (optional imports for Express users)
export { default as assetsRoutes } from './routes/assetsRoutes';
export { default as attachmentsRoutes } from './routes/attachmentsRoutes';
export { default as cloudIntegrationsRoutes } from './routes/cloudIntegrationsRoutes';
export { default as configurationsRoutes } from './routes/configurationsRoutes';
export { default as dependenciesRoutes } from './routes/dependenciesRoutes';
export { default as historyRoutes } from './routes/historyRoutes';
export { default as maintenanceRoutes } from './routes/maintenanceRoutes';