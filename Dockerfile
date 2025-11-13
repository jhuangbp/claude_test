FROM python:3.11-slim

WORKDIR /app

# 安裝依賴
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製數據庫和配置文件
COPY Marine_Revenue_FY20-FY24_detail.db .
COPY Marine_Revenue_FY20-FY24_summary_table.db .
COPY metadata.yml .

# 暴露端口
EXPOSE 8001

# 啟動 datasette
CMD ["datasette", "serve", \
     "Marine_Revenue_FY20-FY24_detail.db", \
     "Marine_Revenue_FY20-FY24_summary_table.db", \
     "--host", "0.0.0.0", \
     "--port", "8001", \
     "--cors", \
     "--metadata", "metadata.yml"]
