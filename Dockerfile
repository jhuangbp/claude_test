# Dockerfile for Cloud Run
# 用於部署到 Google Cloud Run

FROM nginx:alpine

# 複製所有檔案到 nginx 的 html 目錄
COPY . /usr/share/nginx/html

# 暴露 8080 埠（Cloud Run 預設埠）
EXPOSE 8080

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"]


