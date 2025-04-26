/**
 * Base error class for all asset utility errors
 */
export class AssetUtilityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * Thrown when an asset is not found
 */
export class AssetNotFoundError extends AssetUtilityError {
  constructor(assetId: string) {
    super(`Asset with ID ${assetId} not found`);
  }
}

/**
 * Thrown when a maintenance schedule is not found
 */
export class MaintenanceScheduleNotFoundError extends AssetUtilityError {
  constructor(scheduleId: string) {
    super(`Maintenance schedule with ID ${scheduleId} not found`);
  }
}

/**
 * Thrown when cloud provider integration fails
 */
export class CloudIntegrationError extends AssetUtilityError {
  constructor(provider: string, details: string) {
    super(`Failed to integrate with ${provider}: ${details}`);
  }
}

/**
 * Thrown when required configuration is missing
 */
export class ConfigurationError extends AssetUtilityError {
  constructor(message: string) {
    super(message);
  }
}

/**
 * Thrown when an invalid operation is attempted
 */
export class InvalidOperationError extends AssetUtilityError {
  constructor(message: string) {
    super(message);
  }
}