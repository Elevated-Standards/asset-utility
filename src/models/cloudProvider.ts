export class CloudProvider {
    providerName: string;
    integrationDetails: string;
    supportedAssets: string[];

    constructor(providerName: string, integrationDetails: string, supportedAssets: string[]) {
        this.providerName = providerName;
        this.integrationDetails = integrationDetails;
        this.supportedAssets = supportedAssets;
    }
}