/**
 * Helper functions for common tasks across services
 */

import { ConfigurationError } from './errors';

/**
 * Creates an ISO string from a Date, handling both Date objects and strings
 */
export function toISOString(date: Date | string): string {
    return date instanceof Date ? date.toISOString() : new Date(date).toISOString();
}

/**
 * Validates that required fields are present in an object
 */
export function validateRequiredFields<T extends object>(
    obj: T,
    requiredFields: (keyof T)[],
    context: string
): void {
    for (const field of requiredFields) {
        if (obj[field] === undefined || obj[field] === null) {
            throw new ConfigurationError(`Missing required field '${String(field)}' in ${context}`);
        }
    }
}

/**
 * Validates AWS credentials
 */
export function validateAwsCredentials(credentials: {
    accessKey?: string;
    secretKey?: string;
}): void {
    validateRequiredFields(
        credentials,
        ['accessKey', 'secretKey'] as const,
        'AWS credentials'
    );
}

/**
 * Validates Azure credentials
 */
export function validateAzureCredentials(credentials: {
    tenantId?: string;
    clientId?: string;
    clientSecret?: string;
}): void {
    validateRequiredFields(
        credentials,
        ['tenantId', 'clientId', 'clientSecret'] as const,
        'Azure credentials'
    );
}

/**
 * Generates a random ID with a given prefix
 */
export function generateId(prefix: string = ''): string {
    return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Deep clones an object while converting Date strings to Date objects
 */
export function parseObjectDates<T extends object>(obj: T): T {
    return JSON.parse(JSON.stringify(obj), (key, value) => {
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
            return new Date(value);
        }
        return value;
    });
}