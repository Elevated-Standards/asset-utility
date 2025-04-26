import React, { useState, useEffect } from 'react';
import {
    AssetService,
    DependencyService,
    MaintenanceService,
    Asset,
    AssetDependency,
    MaintenanceSchedule
} from 'asset-utility';

/**
 * Example: React Integration
 * 
 * This recipe demonstrates how to integrate the Asset Utility package
 * with a React application, including proper service initialization
 * and state management.
 */

// Initialize services
const assetService = new AssetService();
const dependencyService = new DependencyService();
const maintenanceService = new MaintenanceService();

// Asset List Component
const AssetList: React.FC = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = async () => {
        try {
            const assetList = await assetService.getAllAssets();
            setAssets(assetList);
            setError(null);
        } catch (err) {
            setError('Failed to load assets');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading assets...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Assets</h2>
            <div className="asset-grid">
                {assets.map(asset => (
                    <AssetCard key={asset.id} asset={asset} />
                ))}
            </div>
        </div>
    );
};

// Asset Details Component
interface AssetDetailsProps {
    assetId: string;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ assetId }) => {
    const [asset, setAsset] = useState<Asset | null>(null);
    const [dependencies, setDependencies] = useState<AssetDependency[]>([]);
    const [maintenance, setMaintenance] = useState<MaintenanceSchedule[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAssetDetails();
    }, [assetId]);

    const loadAssetDetails = async () => {
        try {
            setLoading(true);
            
            // Load asset details, dependencies, and maintenance in parallel
            const [assetData, deps, maint] = await Promise.all([
                assetService.getAssetById(assetId),
                dependencyService.getDependenciesForAsset(assetId),
                maintenanceService.getMaintenanceHistory(assetId)
            ]);

            setAsset(assetData);
            setDependencies(deps);
            setMaintenance(maint);
        } catch (error) {
            console.error('Failed to load asset details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading details...</div>;
    if (!asset) return <div>Asset not found</div>;

    return (
        <div className="asset-details">
            <h2>{asset.name}</h2>
            
            {/* Asset Information */}
            <section>
                <h3>Details</h3>
                <div>Type: {asset.type}</div>
                <div>Status: {asset.status}</div>
                <div>Location: {asset.location}</div>
                {asset.provider && <div>Provider: {asset.provider}</div>}
            </section>

            {/* Dependencies */}
            <section>
                <h3>Dependencies</h3>
                {dependencies.length === 0 ? (
                    <p>No dependencies</p>
                ) : (
                    <ul>
                        {dependencies.map(dep => (
                            <li key={dep.id}>
                                {dep.type}: {dep.description}
                                <span className={`impact impact-${dep.impact}`}>
                                    {dep.impact}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Maintenance Schedule */}
            <section>
                <h3>Maintenance History</h3>
                {maintenance.length === 0 ? (
                    <p>No maintenance scheduled</p>
                ) : (
                    <ul>
                        {maintenance.map(schedule => (
                            <li key={schedule.id}>
                                <div>{schedule.title}</div>
                                <div>Status: {schedule.status}</div>
                                <div>
                                    {new Date(schedule.startDate).toLocaleDateString()}
                                    {' - '}
                                    {new Date(schedule.endDate).toLocaleDateString()}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

// New Asset Form Component
const NewAssetForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
        provider: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newAsset = await assetService.createAsset({
                ...formData,
                status: 'active',
                configuration: {}
            });
            
            // Handle successful creation (e.g., redirect or show message)
            console.log('Created asset:', newAsset);
            
            // Reset form
            setFormData({
                name: '',
                type: '',
                location: '',
                provider: ''
            });
        } catch (error) {
            console.error('Failed to create asset:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({
                            ...formData,
                            name: e.target.value
                        })}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Type:
                    <input
                        type="text"
                        value={formData.type}
                        onChange={e => setFormData({
                            ...formData,
                            type: e.target.value
                        })}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Location:
                    <input
                        type="text"
                        value={formData.location}
                        onChange={e => setFormData({
                            ...formData,
                            location: e.target.value
                        })}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Provider:
                    <select
                        value={formData.provider}
                        onChange={e => setFormData({
                            ...formData,
                            provider: e.target.value
                        })}
                    >
                        <option value="">None</option>
                        <option value="aws">AWS</option>
                        <option value="azure">Azure</option>
                        <option value="other">Other</option>
                    </select>
                </label>
            </div>

            <button type="submit">Create Asset</button>
        </form>
    );
};

// Asset Card Component
interface AssetCardProps {
    asset: Asset;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
    return (
        <div className="asset-card">
            <h3>{asset.name}</h3>
            <div className={`status status-${asset.status}`}>
                {asset.status}
            </div>
            <div className="details">
                <div>Type: {asset.type}</div>
                <div>Location: {asset.location}</div>
                {asset.provider && <div>Provider: {asset.provider}</div>}
            </div>
        </div>
    );
};

export {
    AssetList,
    AssetDetails,
    NewAssetForm,
    AssetCard
};