# Army Slot Machine Database - Datasette Cloud Deployment Project

US Marine Corps base revenue data analysis system, built on Datasette, supporting Render cloud platform deployment with reference configurations for other cloud platforms.

## Project Overview

This project uses the Datasette open-source tool to explore and analyze revenue data from US Marine Corps bases in Japan and South Korea (Fiscal Years 2016-2020). It provides complete deployment configuration, allowing you to easily run database queries and analysis on major cloud platforms.

## Database Contents

This project contains three military revenue databases:

### 1. Marine_Revenue_FY20-FY24_detail.db (776 KB)
- **Table Name**: revenue_detail
- **Records**: 7,309 entries
- **Content**: Monthly detailed revenue data for each Marine base
- **Fields**: Page, Loc #, Location, Month, Revenue, NAFI Amt, Annual Revenue, Annual NAFI

### 2. Marine_Revenue_FY20-FY24_summary_table.db (28 KB)
- **Table Name**: revenue_summary
- **Records**: 97 entries
- **Content**: Annual revenue summary by country and Marine base
- **Fields**: Page, Country, Installation, FY16, FY17, FY18, FY19, FY20 thru SEP, Annualized FY20

### 3. District_Revenue_with_lat_lon.db (NEW)
- **Table Name**: district_revenue
- **Records**: 9,876 entries
- **Content**: Army district revenue data with geographic coordinates (FY19-FY20)
- **Fields**: Service, Category, Region, Base, Location, Month, Year, Amount, Base_clean, Base_core, Base_core_matched, Base_lat, Base_lon
- **Geographic Coverage**: 40 unique Army bases across 3 regions (Europe, Pacific, Americas)
- **Special Features**: Includes latitude and longitude coordinates for mapping capabilities

## Features

- Three military revenue SQLite databases (Marine monthly details + Marine annual summary + Army district revenue with geographic data)
- **Interactive Geographic Map Visualization** with latitude/longitude data using Leaflet.js
- Cluster map visualization for Army district revenue data
- Docker containerization support
- Render cloud platform deployment support
- Complete configuration files and metadata
- Ready to use out of the box with built-in index optimization

## Geographic Map Visualization

The District Revenue database includes interactive map visualization powered by the `datasette-cluster-map` plugin.

### Features:
- **Interactive Map**: Visualize all Army bases on an interactive Leaflet map
- **Marker Clustering**: Automatically groups nearby markers for better performance and clarity
- **Base Locations**: View geographic distribution of 40 Army bases across Europe, Pacific, and Americas regions
- **Click for Details**: Click on any marker to see base information and revenue data

### How to Use:
1. Start Datasette (see Local Development section below)
2. Navigate to the District Revenue table: http://localhost:8001/District_Revenue_with_lat_lon/district_revenue
3. The interactive map will appear at the top of the page showing all base locations
4. Zoom and pan to explore different regions
5. Click on markers to view base details

### Technical Details:
- **Plugin**: datasette-cluster-map (v0.17+)
- **Map Library**: Leaflet.js
- **Latitude Field**: `Base_lat`
- **Longitude Field**: `Base_lon`
- **Marker Clustering**: Enabled for better performance with large datasets

## Local Development

### Prerequisites

- Python 3.11+
- pip

### Installation and Running

1. **Clone the project**
   ```bash
   git clone https://github.com/jhuangbp/claude_test.git
   cd claude_test
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start Datasette**
   ```bash
   datasette serve \
     Marine_Revenue_FY20-FY24_detail.db \
     Marine_Revenue_FY20-FY24_summary_table.db \
     District_Revenue_with_lat_lon.db \
     --host 0.0.0.0 \
     --port 8001 \
     --metadata metadata.yml \
     --config datasette.yml
   ```

4. **Access the application**

   Open your browser and visit: http://localhost:8001

   You can:
   - Browse all tables in both databases
   - Execute SQL queries to analyze revenue data
   - Use Datasette's built-in filtering and sorting features
   - Export data in CSV or JSON format

## Docker Deployment

### Local Docker Run

```bash
# Build image
docker build -t datasette-app .

# Run container
docker run -p 8001:8001 datasette-app
```

### Using Docker Compose

```bash
docker-compose up -d
```

## Cloud Platform Deployment

### Render Deployment

Render provides fully managed cloud services.

**Steps:**

1. Visit [Render](https://render.com)
2. Sign up/Log in
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Render will automatically detect `render.yaml` and deploy

Or use Blueprint for one-click deployment:

```bash
# Push this repository to GitHub
# Then in Render Dashboard:
# New → Blueprint → Connect repository
```

**Advantages:**
- Free tier available
- Automatic HTTPS
- Auto deployment
- Easy to configure

### Google Cloud Run Deployment

```bash
# Set up project
gcloud config set project YOUR_PROJECT_ID

# Build and push image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/datasette

# Deploy to Cloud Run
gcloud run deploy datasette \
  --image gcr.io/YOUR_PROJECT_ID/datasette \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated
```

### AWS App Runner Deployment

1. Push Docker image to Amazon ECR
2. Create a new service in the AWS App Runner console
3. Select the image from ECR
4. Configure port to 8001
5. Deploy

## Project Structure

```
.
├── Dockerfile                                    # Docker configuration
├── docker-compose.yml                            # Docker Compose configuration
├── requirements.txt                              # Python dependencies
├── Marine_Revenue_FY20-FY24_detail.db           # Monthly revenue detail database (776 KB)
├── Marine_Revenue_FY20-FY24_summary_table.db    # Annual revenue summary database (28 KB)
├── District_Revenue_with_lat_lon.db             # Army district revenue with coordinates database
├── Marine_Revenue_FY20-FY24_detail.csv          # Original CSV data (detail)
├── Marine_Revenue_FY20-FY24_summary_table.csv   # Original CSV data (summary)
├── District_Revenue_with_lat_lon.csv            # Original CSV data (district revenue)
├── metadata.yml                                  # Datasette metadata configuration
├── datasette.yml                                 # Datasette settings configuration
├── render.yaml                                   # Render deployment configuration
└── README.md                                     # This file
```

## Configuration Details

### metadata.yml

Contains metadata configuration for all three databases:
- **Marine_Revenue_FY20-FY24_detail**: Monthly revenue detail database configuration
- **Marine_Revenue_FY20-FY24_summary_table**: Annual revenue summary database configuration
- **District_Revenue_with_lat_lon**: Army district revenue with geographic data

Each database has:
- English titles and descriptions
- Label field settings for tables
- Data statistics information

### datasette.yml

Datasette runtime settings, including:
- Default page size: 20 records
- Maximum returned rows: 1000
- SQL query timeout: 1000ms
- CSV streaming export support
- Auto-suggest facet functionality

### Environment Variables

Default settings can be overridden via environment variables:

- `PORT`: Service port (default 8001)
- `DATASETTE_SECRET`: For signing cookies

## Database Details

### revenue_detail Table (Monthly Details)

Contains 7,309 monthly revenue records for US Marine Corps bases:

- **Location Range**: Japan (Camp Fuji, Camp Schwab, Camp Hansen, Camp Courtney, Camp Butler/Foster, Camp Kinser, Iwakuni) and South Korea (Camp Mujuk)
- **Time Range**: 2015-2019
- **Revenue Types**: Revenue and NAFI Amount
- **Indexes**: location, month, page

**Example Queries**:
```sql
-- Query annual total revenue for a specific base
SELECT location, SUM(revenue) as total_revenue
FROM revenue_detail
WHERE location = 'Camp Butler/Foster'
GROUP BY location;

-- Query average monthly revenue for each base
SELECT location, AVG(revenue) as avg_monthly_revenue
FROM revenue_detail
WHERE revenue IS NOT NULL
GROUP BY location
ORDER BY avg_monthly_revenue DESC;
```

### revenue_summary Table (Annual Summary)

Contains 97 annual revenue summary entries by country and base:

- **Countries**: Japan, South Korea
- **Fiscal Years**: FY16, FY17, FY18, FY19, FY20
- **Data Types**: Total revenue and annualized revenue for each fiscal year
- **Indexes**: installation, country, page

**Example Queries**:
```sql
-- Compare revenue trends for each base across different years
SELECT installation, fy16, fy17, fy18, fy19, annualized_fy20
FROM revenue_summary
WHERE country = 'Japan'
ORDER BY annualized_fy20 DESC;

-- Calculate total revenue for each year
SELECT
  SUM(fy16) as total_fy16,
  SUM(fy17) as total_fy17,
  SUM(fy18) as total_fy18,
  SUM(fy19) as total_fy19
FROM revenue_summary;
```

### district_revenue Table (Army District Revenue with Coordinates)

Contains 9,876 monthly revenue records for US Army bases with geographic coordinates:

- **Geographic Coverage**: 40 unique bases across 3 regions (Europe, Pacific, Americas)
- **Time Range**: FY19-FY20
- **Special Features**: Includes latitude and longitude for mapping
- **Indexes**: base, region, year, location

**Example Queries**:
```sql
-- Query revenue by region with geographic data
SELECT region, base, base_lat, base_lon, SUM(amount) as total_revenue
FROM district_revenue
WHERE amount > 0
GROUP BY region, base, base_lat, base_lon
ORDER BY total_revenue DESC;

-- Find bases in a specific region
SELECT DISTINCT base, base_lat, base_lon, region
FROM district_revenue
WHERE region = 'Europe'
ORDER BY base;

-- Monthly revenue trend for a specific base
SELECT year, month, SUM(amount) as monthly_total
FROM district_revenue
WHERE base = 'Ansbach'
GROUP BY year, month
ORDER BY year, month;
```

## Customization and Extension

### Adding New Databases

To add your own database:

1. Place the new SQLite database file in the project root directory
2. Update `metadata.yml` to add configuration for the new database
3. Modify the COPY and CMD instructions in `Dockerfile`
4. Update `docker-compose.yml` and other deployment configurations

### Creating Databases from CSV

If you have CSV files you want to convert to SQLite:

```python
import sqlite3
import csv

conn = sqlite3.connect('your_database.db')
cursor = conn.cursor()

# Create table
cursor.execute('''CREATE TABLE your_table (...)''')

# Import CSV
with open('your_data.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        cursor.execute('INSERT INTO your_table VALUES (...)', tuple(row.values()))

conn.commit()
conn.close()
```

## Advanced Configuration

### Adding Plugins

Add Datasette plugins in `requirements.txt`:

```txt
datasette-vega>=0.6
datasette-cluster-map>=0.17
datasette-json-html>=1.0
```

### Enabling Authentication

Install authentication plugin:

```bash
pip install datasette-auth-passwords
```

### Custom Styling

Create `static/` and `templates/` directories to customize appearance.

## Monitoring and Maintenance

### View Logs

**Render:**
View logs through Dashboard

### Updating Deployment

After modifying code:

1. Commit changes to Git
2. Push to remote repository
3. Most platforms will automatically redeploy

Or manually click **Manual Deploy** in Render Dashboard to redeploy.

## Cost Estimates

| Platform | Free Tier | Paid Plan Starting Price |
|----------|-----------|-------------------------|
| Render | 750 hours/month | $7/month |
| Cloud Run | 2 million requests/month | Pay per use |

## Troubleshooting

### Port Issues

Some platforms may require specific ports. Check platform documentation and update configuration.

### Database Locking

SQLite may experience locking under high concurrency. Consider:
- Enable WAL mode
- Use read-only mode
- Migrate to PostgreSQL (using datasette-postgres)

### Memory Limitations

If encountering memory issues, you can:
- Reduce `num_sql_threads`
- Lower `cache_size_kb`
- Upgrade to a larger instance

## Related Resources

- [Datasette Official Documentation](https://docs.datasette.io/)
- [Render Documentation](https://render.com/docs)
- [Datasette Plugin Directory](https://datasette.io/plugins)

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Contributing

Issues and Pull Requests are welcome!

## Contact

For questions or suggestions, please open an Issue.
