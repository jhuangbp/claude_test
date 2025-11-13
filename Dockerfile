FROM python:3.11-slim

WORKDIR /app

# 安裝依賴
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製數據庫和配置文件
COPY example.db .
COPY metadata.yml .
COPY datasette.yml .

# 暴露端口
EXPOSE 8001

# 啟動 datasette
CMD ["datasette", "serve", "example.db", \
     "--host", "0.0.0.0", \
     "--port", "8001", \
     "--cors", \
     "--metadata", "metadata.yml", \
     "--config-file", "datasette.yml"]
