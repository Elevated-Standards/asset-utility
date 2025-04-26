## API Endpoints

### Assets
- `POST /assets`: Create a new asset
- `GET /assets`: Retrieve a list of all assets
- `GET /assets/:id`: Retrieve an asset by ID
- `PUT /assets/:id`: Update an existing asset
- `DELETE /assets/:id`: Delete an asset

### Cloud Integrations
- `POST /integrations/aws`: Integrate with AWS
- `POST /integrations/azure`: Integrate with Azure
- `GET /integrations`: List all integrations
- `DELETE /integrations/:provider`: Remove a cloud integration (e.g., AWS or Azure)

### Maintenance
- `POST /maintenance`: Schedule maintenance for an asset
- `GET /maintenance`: Retrieve all scheduled maintenance activities
- `GET /maintenance/history`: Retrieve maintenance history
- `GET /maintenance/:id`: Retrieve details of a specific maintenance activity
- `PUT /maintenance/:id`: Update a maintenance schedule
- `DELETE /maintenance/:id`: Cancel a maintenance activity

### Asset Dependencies
- `POST /dependencies`: Add a dependency between assets
- `GET /dependencies`: Retrieve all asset dependencies
- `GET /dependencies/:id`: Retrieve dependencies for a specific asset
- `DELETE /dependencies/:id`: Remove a dependency

### Asset Configuration
- `POST /configurations`: Create a configuration baseline for an asset
- `GET /configurations`: Retrieve all configuration baselines
- `GET /configurations/:id`: Retrieve a specific configuration baseline
- `PUT /configurations/:id`: Update a configuration baseline
- `DELETE /configurations/:id`: Delete a configuration baseline

### Asset Change History
- `GET /history/assets`: Retrieve change history for all assets
- `GET /history/assets/:id`: Retrieve change history for a specific asset

### Document Attachments
- `POST /attachments`: Attach a document to an asset
- `GET /attachments`: Retrieve all attachments
- `GET /attachments/:id`: Retrieve a specific attachment
- `DELETE /attachments/:id`: Remove an attachment from an asset