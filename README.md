# Datasette deployment for US military revenue datasets

This repository packages three SQLite databases with Datasette so you can explore revenue data from US Marine Corps and Army locations. It includes ready-to-run configurations for local development, Docker, and Render.

## Contents
- `Marine_Revenue_FY20-FY24_detail.db`: Monthly Marine Corps revenue detail records.
- `Marine_Revenue_FY20-FY24_summary_table.db`: Annual Marine Corps revenue summaries by base and country.
- `District_Revenue_with_lat_lon.db`: Army district revenue with latitude/longitude for map visualization.
- `metadata.yml`: Datasette metadata and plugin configuration (including cluster map settings for the Army dataset).
- `Dockerfile`, `docker-compose.yml`, `render.yaml`: Deployment artifacts for Docker, Docker Compose, and Render.
- `requirements.txt`: Python dependencies for Datasette and the cluster map plugin.

## Local usage
1. Install dependencies (Python 3.11+ recommended):
   ```bash
   pip install -r requirements.txt
   ```
2. Start Datasette with the bundled databases:
   ```bash
   datasette serve \
     Marine_Revenue_FY20-FY24_detail.db \
     Marine_Revenue_FY20-FY24_summary_table.db \
     District_Revenue_with_lat_lon.db \
     --host 0.0.0.0 \
     --port 8001 \
     --metadata metadata.yml
   ```
3. Open http://localhost:8001 to browse tables, run SQL queries, download CSV/JSON, and view the clustered map for Army locations.

## Docker
Build and run directly with Docker:
```bash
# Build
docker build -t datasette-app .

# Run
docker run -p 8001:8001 datasette-app
```

## Docker Compose
```bash
docker-compose up --build
```

## Deploying to Render
Render is configured to build from the included Dockerfile. Update `render.yaml` as needed and push to your Render-connected repository. The service listens on port `8001`.

## License
This project is licensed under the MIT License. See `LICENSE` for details.
