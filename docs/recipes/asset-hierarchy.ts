import {
    AssetService,
    DependencyService,
    Asset,
    AssetDependency
} from 'asset-utility';

/**
 * Example: Building an Asset Hierarchy
 * 
 * This recipe demonstrates how to create and manage a hierarchical structure
 * of assets, such as an application stack or infrastructure layout.
 */

// Initialize services
const assetService = new AssetService();
const dependencyService = new DependencyService();

// Create application stack assets
async function createApplicationStack() {
    // Create the main application components
    const webApp = await assetService.createAsset({
        name: 'Web Application',
        type: 'application',
        status: 'active',
        location: 'us-east-1',
        provider: 'aws',
        configuration: {
            runtime: 'node.js',
            version: '16.x'
        }
    });

    const apiService = await assetService.createAsset({
        name: 'API Service',
        type: 'application',
        status: 'active',
        location: 'us-east-1',
        provider: 'aws',
        configuration: {
            runtime: 'node.js',
            version: '16.x'
        }
    });

    const database = await assetService.createAsset({
        name: 'Main Database',
        type: 'database',
        status: 'active',
        location: 'us-east-1',
        provider: 'aws',
        configuration: {
            engine: 'postgres',
            version: '14'
        }
    });

    const cache = await assetService.createAsset({
        name: 'Redis Cache',
        type: 'cache',
        status: 'active',
        location: 'us-east-1',
        provider: 'aws',
        configuration: {
            engine: 'redis',
            version: '6.x'
        }
    });

    // Create the dependencies to establish the hierarchy
    await dependencyService.addDependency({
        sourceAssetId: webApp.id,
        targetAssetId: apiService.id,
        type: 'requires',
        impact: 'high',
        description: 'Web app requires API for all backend operations'
    });

    await dependencyService.addDependency({
        sourceAssetId: apiService.id,
        targetAssetId: database.id,
        type: 'requires',
        impact: 'critical',
        description: 'API requires database for data persistence'
    });

    await dependencyService.addDependency({
        sourceAssetId: apiService.id,
        targetAssetId: cache.id,
        type: 'requires',
        impact: 'high',
        description: 'API uses cache for performance optimization'
    });

    return {
        webApp,
        apiService,
        database,
        cache
    };
}

// Get all dependencies for an asset, including indirect ones
async function getAllRelatedAssets(assetId: string): Promise<{
    directDependencies: AssetDependency[];
    relatedAssets: Asset[];
}> {
    const directDependencies = await dependencyService.getDependenciesForAsset(assetId);
    
    // Get all related asset IDs
    const relatedAssetIds = new Set(
        directDependencies.flatMap(dep => [
            dep.sourceAssetId,
            dep.targetAssetId
        ])
    );

    // Remove the original asset ID
    relatedAssetIds.delete(assetId);

    // Fetch all related assets
    const relatedAssets = await Promise.all(
        Array.from(relatedAssetIds).map(id => assetService.getAssetById(id))
    );

    return {
        directDependencies,
        relatedAssets
    };
}

// Example usage
async function main() {
    try {
        // Create the application stack
        const stack = await createApplicationStack();

        // Get all assets related to the web app
        const webAppDependencies = await getAllRelatedAssets(stack.webApp.id);

        console.log('Web App Dependencies:', {
            directDependencies: webAppDependencies.directDependencies.length,
            relatedAssets: webAppDependencies.relatedAssets.map(asset => asset.name)
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// For demonstration purposes
if (require.main === module) {
    main();
}