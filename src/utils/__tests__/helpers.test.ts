import {
    toISOString,
    validateRequiredFields,
    validateAwsCredentials,
    validateAzureCredentials,
    generateId,
    parseObjectDates
} from '../helpers';
import { ConfigurationError } from '../errors';

describe('Helper Functions', () => {
    describe('toISOString', () => {
        it('should handle Date objects', () => {
            const date = new Date('2025-01-01T12:00:00Z');
            expect(toISOString(date)).toBe('2025-01-01T12:00:00.000Z');
        });

        it('should handle date strings', () => {
            const dateStr = '2025-01-01T12:00:00Z';
            expect(toISOString(dateStr)).toBe('2025-01-01T12:00:00.000Z');
        });
    });

    describe('validateRequiredFields', () => {
        it('should not throw for valid object', () => {
            const obj = { field1: 'value1', field2: 'value2' };
            expect(() => {
                validateRequiredFields(obj, ['field1', 'field2'], 'test');
            }).not.toThrow();
        });

        it('should throw ConfigurationError for missing fields', () => {
            const obj = { field1: 'value1' };
            expect(() => {
                validateRequiredFields(obj, ['field1', 'field2'], 'test');
            }).toThrow(ConfigurationError);
        });
    });

    describe('validateAwsCredentials', () => {
        it('should not throw for valid credentials', () => {
            const credentials = {
                accessKey: 'test-key',
                secretKey: 'test-secret'
            };
            expect(() => {
                validateAwsCredentials(credentials);
            }).not.toThrow();
        });

        it('should throw ConfigurationError for missing credentials', () => {
            const credentials = {
                accessKey: 'test-key'
            };
            expect(() => {
                validateAwsCredentials(credentials);
            }).toThrow(ConfigurationError);
        });
    });

    describe('validateAzureCredentials', () => {
        it('should not throw for valid credentials', () => {
            const credentials = {
                tenantId: 'test-tenant',
                clientId: 'test-client',
                clientSecret: 'test-secret'
            };
            expect(() => {
                validateAzureCredentials(credentials);
            }).not.toThrow();
        });

        it('should throw ConfigurationError for missing credentials', () => {
            const credentials = {
                tenantId: 'test-tenant',
                clientId: 'test-client'
            };
            expect(() => {
                validateAzureCredentials(credentials);
            }).toThrow(ConfigurationError);
        });
    });

    describe('generateId', () => {
        it('should generate unique IDs', () => {
            const id1 = generateId();
            const id2 = generateId();
            expect(id1).not.toBe(id2);
        });

        it('should include prefix when provided', () => {
            const id = generateId('test-');
            expect(id).toMatch(/^test-/);
        });
    });

    describe('parseObjectDates', () => {
        it('should convert date strings to Date objects', () => {
            const obj = {
                date: '2025-01-01T12:00:00Z',
                nested: {
                    date: '2025-01-02T12:00:00Z'
                }
            };
            const parsed = parseObjectDates(obj);
            expect(parsed.date).toBeInstanceOf(Date);
            expect(parsed.nested.date).toBeInstanceOf(Date);
        });

        it('should not modify non-date strings', () => {
            const obj = {
                text: 'not a date',
                date: '2025-01-01T12:00:00Z'
            };
            const parsed = parseObjectDates(obj);
            expect(parsed.text).toBe('not a date');
            expect(parsed.date).toBeInstanceOf(Date);
        });
    });
});