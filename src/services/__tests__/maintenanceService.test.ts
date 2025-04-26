import { MaintenanceService } from '../maintenanceService';
import { MaintenanceSchedule } from '../../models/maintenanceSchedule';

describe('MaintenanceService', () => {
  let service: MaintenanceService;
  let mockMaintenance: {
    assetId: string;
    startDate: Date;
    endDate: Date;
    details: {
      title: string;
      description: string;
      type: 'preventive';
      assignedTo: string;
      priority: 'medium';
      notes: string;
    };
  };

  beforeEach(() => {
    service = new MaintenanceService();
    mockMaintenance = {
      assetId: 'asset-123',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-02'),
      details: {
        title: 'Test Maintenance',
        description: 'Test Description',
        type: 'preventive',
        assignedTo: 'technician-1',
        priority: 'medium',
        notes: 'Test notes'
      }
    };
  });

  describe('scheduleMaintenance', () => {
    it('should create a new maintenance schedule', () => {
      const result = service.scheduleMaintenance(
        mockMaintenance.assetId,
        mockMaintenance.startDate,
        mockMaintenance.endDate,
        mockMaintenance.details
      );

      expect(result).toMatchObject({
        assetId: mockMaintenance.assetId,
        status: 'scheduled',
        ...mockMaintenance.details
      });
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('getMaintenanceHistory', () => {
    it('should return maintenance history for an asset', () => {
      const schedule = service.scheduleMaintenance(
        mockMaintenance.assetId,
        mockMaintenance.startDate,
        mockMaintenance.endDate,
        mockMaintenance.details
      );

      const history = service.getMaintenanceHistory(mockMaintenance.assetId);
      expect(history).toHaveLength(1);
      expect(history[0]).toEqual(schedule);
    });

    it('should return empty array if no maintenance history exists', () => {
      const history = service.getMaintenanceHistory('non-existent-asset');
      expect(history).toHaveLength(0);
    });
  });

  describe('updateMaintenanceSchedule', () => {
    it('should update an existing maintenance schedule', () => {
      const schedule = service.scheduleMaintenance(
        mockMaintenance.assetId,
        mockMaintenance.startDate,
        mockMaintenance.endDate,
        mockMaintenance.details
      );

      const updates: Partial<MaintenanceSchedule> = {
        status: 'in-progress',
        title: 'Updated Title'
      };

      const updated = service.updateMaintenanceSchedule(schedule.id, updates);
      expect(updated).toBeDefined();
      expect(updated?.status).toBe('in-progress');
      expect(updated?.title).toBe('Updated Title');
      expect(updated?.updatedAt).not.toEqual(schedule.updatedAt);
    });

    it('should return null when updating non-existent schedule', () => {
      const updated = service.updateMaintenanceSchedule('non-existent', {});
      expect(updated).toBeNull();
    });
  });

  describe('getScheduleById', () => {
    it('should return a maintenance schedule by id', () => {
      const schedule = service.scheduleMaintenance(
        mockMaintenance.assetId,
        mockMaintenance.startDate,
        mockMaintenance.endDate,
        mockMaintenance.details
      );

      const found = service.getScheduleById(schedule.id);
      expect(found).toEqual(schedule);
    });

    it('should return null for non-existent schedule', () => {
      const found = service.getScheduleById('non-existent');
      expect(found).toBeNull();
    });
  });

  describe('cancelSchedule', () => {
    it('should cancel an existing maintenance schedule', () => {
      const schedule = service.scheduleMaintenance(
        mockMaintenance.assetId,
        mockMaintenance.startDate,
        mockMaintenance.endDate,
        mockMaintenance.details
      );

      const cancelled = service.cancelSchedule(schedule.id);
      expect(cancelled).toBe(true);
      expect(service.getScheduleById(schedule.id)).toBeNull();
    });

    it('should return false when cancelling non-existent schedule', () => {
      const cancelled = service.cancelSchedule('non-existent');
      expect(cancelled).toBe(false);
    });
  });
});