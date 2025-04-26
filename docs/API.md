# Asset Utility API Documentation

## Installation

```bash
npm install asset-utility
```

## Basic Usage

```typescript
import { 
  MaintenanceService, 
  AssetService,
  CloudIntegrationService,
  Asset,
  MaintenanceSchedule
} from 'asset-utility';

// Initialize services
const maintenanceService = new MaintenanceService();
const assetService = new AssetService();
const cloudService = new CloudIntegrationService();

// Create and manage assets
const asset: Asset = await assetService.createAsset({
  name: 'Production Server',
  type: 'server',
  status: 'active',
  location: 'us-east-1',
  provider: 'aws'
});

// Schedule maintenance
const maintenance = maintenanceService.scheduleMaintenance(
  asset.id,
  new Date('2025-05-01'),
  new Date('2025-05-02'),
  {
    title: 'Monthly Server Maintenance',
    description: 'Regular system updates and health checks',
    type: 'preventive',
    assignedTo: 'ops-team',
    priority: 'medium'
  }
);

// Integrate with cloud providers
await cloudService.integrateAWS({
  region: 'us-east-1',
  credentials: {
    accessKey: 'YOUR_ACCESS_KEY',
    secretKey: 'YOUR_SECRET_KEY'
  }
});
```

## Express Integration

If you're using Express, you can use the provided route handlers:

```typescript
import express from 'express';
import { 
  assetsRoutes,
  maintenanceRoutes,
  cloudIntegrationsRoutes 
} from 'asset-utility';

const app = express();
app.use('/assets', assetsRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use('/integrations', cloudIntegrationsRoutes);
```

## Services

### MaintenanceService

Manages maintenance schedules for assets.

```typescript
const maintenanceService = new MaintenanceService();

// Schedule maintenance
const schedule = maintenanceService.scheduleMaintenance(
  'asset-123',
  startDate,
  endDate,
  {
    title: 'Server Maintenance',
    description: 'Monthly updates',
    type: 'preventive',
    assignedTo: 'tech-team',
    priority: 'medium'
  }
);

// Get maintenance history
const history = maintenanceService.getMaintenanceHistory('asset-123');

// Update schedule
const updated = maintenanceService.updateMaintenanceSchedule(
  'schedule-123',
  { status: 'in-progress' }
);

// Cancel schedule
const cancelled = maintenanceService.cancelSchedule('schedule-123');
```

### AssetService

Manages asset lifecycle and properties.

```typescript
const assetService = new AssetService();

// Create asset
const asset = await assetService.createAsset({
  name: 'Database Server',
  type: 'rds',
  status: 'active',
  location: 'us-west-2'
});

// Update asset
const updated = await assetService.updateAsset(
  'asset-123',
  { status: 'maintenance' }
);

// Get asset details
const details = await assetService.getAssetById('asset-123');
```

### CloudIntegrationService

Handles integration with cloud providers.

```typescript
const cloudService = new CloudIntegrationService();

// AWS integration
await cloudService.integrateAWS({
  region: 'us-east-1',
  credentials: {
    accessKey: 'ACCESS_KEY',
    secretKey: 'SECRET_KEY'
  }
});

// Azure integration
await cloudService.integrateAzure({
  credentials: {
    tenantId: 'TENANT_ID',
    clientId: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET'
  },
  region: 'eastus'
});

// List integrations
const integrations = await cloudService.listIntegrations();
```

## Models

### Asset
```typescript
interface Asset {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance';
  location: string;
  provider?: 'aws' | 'azure' | 'other';
  configuration: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
```

### MaintenanceSchedule
```typescript
interface MaintenanceSchedule {
  id: string;
  assetId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'preventive' | 'corrective' | 'predictive';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### CloudProvider
```typescript
interface CloudProvider {
  id: string;
  provider: 'aws' | 'azure';
  credentials: {
    accessKey?: string;
    secretKey?: string;
    tenantId?: string;
    clientId?: string;
    clientSecret?: string;
  };
  region: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
```

## Error Handling

The library throws typed errors that you can catch and handle:

```typescript
try {
  await assetService.updateAsset('non-existent', { status: 'active' });
} catch (error) {
  if (error instanceof AssetNotFoundError) {
    console.error('Asset does not exist');
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Type Definitions

All type definitions are available through the package's types:

```typescript
import type { 
  Asset,
  MaintenanceSchedule,
  CloudProvider,
  AssetConfiguration,
  AssetDependency 
} from 'asset-utility';
```