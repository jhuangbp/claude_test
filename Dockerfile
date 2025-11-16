FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy database and configuration files
COPY Marine_Revenue_FY20-FY24_detail.db .
COPY Marine_Revenue_FY20-FY24_summary_table.db .
COPY metadata.yml .

# Expose port
EXPOSE 8001

# Start datasette
CMD ["datasette", "serve", \
     "Marine_Revenue_FY20-FY24_detail.db", \
     "Marine_Revenue_FY20-FY24_summary_table.db", \
     "--host", "0.0.0.0", \
     "--port", "8001", \
     "--cors", \
     "--metadata", "metadata.yml"]
