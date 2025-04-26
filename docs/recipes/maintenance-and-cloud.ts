import {
    AssetService,
    MaintenanceService,
    CloudIntegrationService,
    Asset,
    CloudProvider,
    MaintenanceSchedule
} from 'asset-utility';

/**
 * Example: Cloud Resource Maintenance
 * 
 * This recipe demonstrates how to manage cloud resources and schedule
 * maintenance windows, including handling different maintenance types
 * and cloud provider integrations.
 */

class CloudMaintenanceManager {
    private assetService: AssetService;
    private maintenanceService: MaintenanceService;
    private cloudService: CloudIntegrationService;

    constructor() {
        this.assetService = new AssetService();
        this.maintenanceService = new MaintenanceService();
        this.cloudService = new CloudIntegrationService();
    }

    /**
     * Sets up cloud provider integration
     */
    async setupCloudProvider(
        provider: 'aws' | 'azure',
        region: string,
        credentials: Record<string, string>
    ): Promise<CloudProvider> {
        if (provider === 'aws') {
            return this.cloudService.integrateAWS({
                region,
                credentials: {
                    accessKey: credentials.accessKey,
                    secretKey: credentials.secretKey
                }
            });
        } else {
            return this.cloudService.integrateAzure({
                region,
                credentials: {
                    tenantId: credentials.tenantId,
                    clientId: credentials.clientId,
                    clientSecret: credentials.clientSecret
                }
            });
        }
    }

    /**
     * Creates a maintenance window for regular system updates
     */
    async scheduleSystemMaintenance(
        asset: Asset,
        startTime: Date
    ): Promise<MaintenanceSchedule> {
        // Schedule for 2-hour maintenance window
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

        return this.maintenanceService.scheduleMaintenance(
            asset.id,
            startTime,
            endTime,
            {
                title: 'System Updates',
                description: 'Regular system updates and security patches',
                type: 'preventive',
                assignedTo: 'system-admin',
                priority: 'medium',
                notes: `Regular maintenance window for ${asset.name}`
            }
        );
    }

    /**
     * Schedules version upgrade maintenance
     */
    async scheduleVersionUpgrade(
        asset: Asset,
        newVersion: string,
        startTime: Date
    ): Promise<MaintenanceSchedule> {
        // Schedule for 4-hour maintenance window
        const endTime = new Date(startTime.getTime() + 4 * 60 * 60 * 1000);

        return this.maintenanceService.scheduleMaintenance(
            asset.id,
            startTime,
            endTime,
            {
                title: `Version Upgrade to ${newVersion}`,
                description: `Upgrade ${asset.type} from ${asset.configuration.version} to ${newVersion}`,
                type: 'predictive',
                assignedTo: 'upgrade-team',
                priority: 'high',
                notes: `Version upgrade maintenance for ${asset.name}`
            }
        );
    }

    /**
     * Creates recurring maintenance schedules
     */
    async setupRecurringMaintenance(
        asset: Asset,
        interval: 'weekly' | 'monthly'
    ): Promise<MaintenanceSchedule[]> {
        const schedules: MaintenanceSchedule[] = [];
        const now = new Date();
        
        // Schedule for the next 3 months
        for (let i = 0; i < 3; i++) {
            const startTime = new Date(now);
            
            if (interval === 'weekly') {
                startTime.setDate(startTime.getDate() + (i * 7));
            } else {
                startTime.setMonth(startTime.getMonth() + i);
            }

            // Set to Sunday 2 AM for weekly, or first Sunday of month for monthly
            startTime.setDate(interval === 'weekly' ? startTime.getDate() : 1);
            startTime.setHours(2, 0, 0, 0);

            const schedule = await this.scheduleSystemMaintenance(asset, startTime);
            schedules.push(schedule);
        }

        return schedules;
    }

    /**
     * Updates asset configuration after maintenance
     */
    async completeMaintenance(
        maintenanceId: string,
        assetUpdates: Partial<Asset>
    ): Promise<void> {
        const schedule = await this.maintenanceService.getScheduleById(maintenanceId);
        
        // Update the maintenance schedule
        await this.maintenanceService.updateMaintenanceSchedule(
            maintenanceId,
            { status: 'completed' }
        );

        // Update the asset if needed
        if (Object.keys(assetUpdates).length > 0) {
            await this.assetService.updateAsset(schedule.assetId, {
                ...assetUpdates,
                status: 'active' // Ensure asset is marked as active after maintenance
            });
        }
    }
}

// Example usage
async function main() {
    try {
        const manager = new CloudMaintenanceManager();

        // Set up cloud provider
        const awsIntegration = await manager.setupCloudProvider('aws', 'us-east-1', {
            accessKey: process.env.AWS_ACCESS_KEY_ID!,
            secretKey: process.env.AWS_SECRET_ACCESS_KEY!
        });

        // Create a database asset
        const assetService = new AssetService();
        const database = await assetService.createAsset({
            name: 'Production RDS',
            type: 'database',
            status: 'active',
            location: 'us-east-1',
            provider: 'aws',
            configuration: {
                engine: 'postgres',
                version: '13'
            }
        });

        // Schedule recurring maintenance
        const recurringMaintenance = await manager.setupRecurringMaintenance(
            database,
            'monthly'
        );
        console.log(`Scheduled ${recurringMaintenance.length} maintenance windows`);

        // Schedule version upgrade
        const upgradeTime = new Date('2025-06-01T02:00:00Z');
        const upgradeMaintenance = await manager.scheduleVersionUpgrade(
            database,
            '14',
            upgradeTime
        );
        console.log('Scheduled version upgrade:', upgradeMaintenance.title);

        // Simulate completing maintenance
        await manager.completeMaintenance(upgradeMaintenance.id, {
            configuration: {
                ...database.configuration,
                version: '14'
            }
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// For demonstration purposes
if (require.main === module) {
    main();
}