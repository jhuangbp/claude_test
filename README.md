# Datasette 雲部署專案

這是一個完整的 Datasette 雲部署環境，支援多種雲平台部署選項。

## 專案簡介

Datasette 是一個強大的開源工具，用於探索和發布數據。此專案提供了完整的部署配置，讓你可以輕鬆在各大雲平台上運行 Datasette。

## 功能特點

- 預配置的範例 SQLite 數據庫（產品和訂單管理系統）
- Docker 容器化支援
- 支援多個雲平台部署：Fly.io、Railway、Render
- 完整的配置文件和元數據
- 開箱即用

## 本地開發

### 前置需求

- Python 3.11+
- pip

### 安裝與運行

1. **克隆專案**
   ```bash
   git clone <your-repo-url>
   cd claude_test
   ```

2. **安裝依賴**
   ```bash
   pip install -r requirements.txt
   ```

3. **初始化數據庫（如果需要）**
   ```bash
   python3 init_database.py
   ```

4. **啟動 Datasette**
   ```bash
   datasette serve example.db \
     --host 0.0.0.0 \
     --port 8001 \
     --metadata metadata.yml \
     --config-file datasette.yml
   ```

5. **訪問應用**

   打開瀏覽器訪問：http://localhost:8001

## Docker 部署

### 本地 Docker 運行

```bash
# 構建鏡像
docker build -t datasette-app .

# 運行容器
docker run -p 8001:8001 datasette-app
```

### 使用 Docker Compose

```bash
docker-compose up -d
```

## 雲平台部署

### 1. Fly.io 部署

Fly.io 是一個現代化的應用平台，提供全球分佈式部署。

**步驟：**

1. 安裝 Fly CLI
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. 登入 Fly.io
   ```bash
   fly auth login
   ```

3. 修改 `fly.toml` 中的 app 名稱（必須唯一）
   ```toml
   app = "your-unique-app-name"
   ```

4. 部署應用
   ```bash
   fly launch --config fly.toml
   ```

5. 訪問應用
   ```bash
   fly open
   ```

**優點：**
- 免費額度（3 個共享 CPU 應用）
- 全球 CDN 和邊緣部署
- 自動 HTTPS
- 優秀的性能

### 2. Railway 部署

Railway 提供簡單的一鍵部署體驗。

**步驟：**

1. 安裝 Railway CLI
   ```bash
   npm i -g @railway/cli
   ```

2. 登入 Railway
   ```bash
   railway login
   ```

3. 初始化並部署
   ```bash
   railway init
   railway up
   ```

或者直接通過 GitHub 部署：

1. 訪問 [Railway](https://railway.app)
2. 點擊 "New Project" → "Deploy from GitHub repo"
3. 選擇此倉庫
4. Railway 會自動檢測 Dockerfile 並部署

**優點：**
- 簡單易用
- 免費額度（$5/月）
- 自動從 GitHub 部署
- 內建監控

### 3. Render 部署

Render 提供完全託管的雲服務。

**步驟：**

1. 訪問 [Render](https://render.com)
2. 註冊/登入帳號
3. 點擊 "New +" → "Web Service"
4. 連接你的 GitHub 倉庫
5. Render 會自動檢測 `render.yaml` 並部署

或使用 Blueprint 一鍵部署：

```bash
# 將此倉庫推送至 GitHub
# 然後在 Render Dashboard 中：
# New → Blueprint → 連接倉庫
```

**優點：**
- 免費層級可用
- 自動 HTTPS
- 自動部署
- 易於配置

### 4. Google Cloud Run 部署

```bash
# 設定專案
gcloud config set project YOUR_PROJECT_ID

# 構建並推送鏡像
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/datasette

# 部署到 Cloud Run
gcloud run deploy datasette \
  --image gcr.io/YOUR_PROJECT_ID/datasette \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated
```

### 5. AWS App Runner 部署

1. 推送 Docker 鏡像至 Amazon ECR
2. 在 AWS App Runner 控制台創建新服務
3. 選擇 ECR 中的鏡像
4. 配置端口為 8001
5. 部署

## 專案結構

```
.
├── Dockerfile              # Docker 配置
├── docker-compose.yml      # Docker Compose 配置
├── requirements.txt        # Python 依賴
├── example.db             # SQLite 數據庫
├── init_database.py       # 數據庫初始化腳本
├── metadata.yml           # Datasette 元數據配置
├── datasette.yml          # Datasette 設定配置
├── fly.toml               # Fly.io 部署配置
├── railway.toml           # Railway 部署配置
├── render.yaml            # Render 部署配置
└── README.md              # 本文件
```

## 配置說明

### metadata.yml

包含數據庫和表的元數據，如標題、描述等。

### datasette.yml

Datasette 的運行時設定，包括：
- 默認頁面大小
- SQL 查詢限制
- 緩存設定
- 下載權限等

### 環境變數

可以通過環境變數覆蓋默認設定：

- `PORT`: 服務端口（默認 8001）
- `DATASETTE_SECRET`: 用於簽名 cookies

## 數據庫說明

專案包含一個範例數據庫 `example.db`，包含：

- **products 表**: 產品信息（名稱、類別、價格、庫存）
- **orders 表**: 訂單記錄（產品、數量、客戶名稱）

你可以運行 `init_database.py` 重新生成數據庫。

## 自定義數據庫

要使用自己的數據庫：

1. 替換 `example.db` 為你的 SQLite 數據庫
2. 更新 `metadata.yml` 中的配置
3. 如有需要，修改 Dockerfile 中的數據庫名稱

## 進階配置

### 添加插件

在 `requirements.txt` 中添加 Datasette 插件：

```txt
datasette-vega>=0.6
datasette-cluster-map>=0.17
datasette-json-html>=1.0
```

### 啟用認證

安裝認證插件：

```bash
pip install datasette-auth-passwords
```

### 自定義樣式

創建 `static/` 和 `templates/` 目錄來自定義外觀。

## 監控和維護

### 查看日誌

**Fly.io:**
```bash
fly logs
```

**Railway:**
```bash
railway logs
```

**Render:**
通過 Dashboard 查看日誌

### 更新部署

修改代碼後：

1. 提交更改到 Git
2. 推送至遠端倉庫
3. 大多數平台會自動重新部署

或手動觸發：

```bash
# Fly.io
fly deploy

# Railway
railway up
```

## 成本估算

| 平台 | 免費額度 | 付費方案起價 |
|------|---------|-------------|
| Fly.io | 3 個共享 CPU 應用 | $0.0000021/秒 |
| Railway | $5/月額度 | $5/月 |
| Render | 750 小時/月 | $7/月 |
| Cloud Run | 200 萬請求/月 | 按用量計費 |

## 故障排除

### 端口問題

某些平台可能要求特定端口。檢查平台文檔並更新配置。

### 數據庫鎖定

SQLite 在高並發下可能出現鎖定。考慮：
- 啟用 WAL 模式
- 使用只讀模式
- 遷移至 PostgreSQL（使用 datasette-postgres）

### 內存限制

如果遇到內存問題，可以：
- 減少 `num_sql_threads`
- 降低 `cache_size_kb`
- 升級至更大的實例

## 相關資源

- [Datasette 官方文檔](https://docs.datasette.io/)
- [Fly.io 文檔](https://fly.io/docs/)
- [Railway 文檔](https://docs.railway.app/)
- [Render 文檔](https://render.com/docs)
- [Datasette 插件目錄](https://datasette.io/plugins)

## 授權

本專案採用 MIT 授權。詳見 LICENSE 文件。

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 聯絡方式

如有問題或建議，請開啟 Issue。
