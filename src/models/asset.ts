export class Asset {
    id: string;
    name: string;
    type: string;
    dependencies: string[];
    configurationBaseline: string;
    changeHistory: Array<{ date: Date; changeDescription: string }>;
    documentAttachments: string[];
    maintenanceSchedule: Array<{ date: Date; details: string }>;

    constructor(
        id: string,
        name: string,
        type: string,
        dependencies: string[] = [],
        configurationBaseline: string = '',
        changeHistory: Array<{ date: Date; changeDescription: string }> = [],
        documentAttachments: string[] = [],
        maintenanceSchedule: Array<{ date: Date; details: string }> = []
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.dependencies = dependencies;
        this.configurationBaseline = configurationBaseline;
        this.changeHistory = changeHistory;
        this.documentAttachments = documentAttachments;
        this.maintenanceSchedule = maintenanceSchedule;
    }
}