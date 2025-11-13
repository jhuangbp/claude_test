# Marine Revenue Database - Datasette 雲部署專案

美國海軍陸戰隊基地收入數據分析系統，基於 Datasette 構建，支援多種雲平台部署。

## 專案簡介

本專案使用 Datasette 開源工具來探索和分析美國海軍陸戰隊在日本和韓國各基地的收入數據（財政年度 2016-2020）。提供完整的部署配置，讓您可以輕鬆在各大雲平台上運行資料庫查詢和分析。

## 資料庫內容

本專案包含兩個 Marine Revenue 資料庫：

### 1. Marine_Revenue_FY20-FY24_detail.db (776 KB)
- **表名稱**: revenue_detail
- **記錄數**: 7,309 筆
- **內容**: 各基地每月詳細收入數據
- **欄位**: Page, Loc #, Location, Month, Revenue, NAFI Amt, Annual Revenue, Annual NAFI

### 2. Marine_Revenue_FY20-FY24_summary_table.db (28 KB)
- **表名稱**: revenue_summary
- **記錄數**: 97 筆
- **內容**: 按國家和基地分類的年度收入彙總
- **欄位**: Page, Country, Installation, FY16, FY17, FY18, FY19, FY20 thru SEP, Annualized FY20

## 功能特點

- 兩個專門的 Marine Revenue SQLite 資料庫（月度明細 + 年度彙總）
- Docker 容器化支援
- 支援多個雲平台部署：Fly.io、Railway、Render
- 完整的配置文件和元數據
- 開箱即用，內建索引優化

## 本地開發

### 前置需求

- Python 3.11+
- pip

### 安裝與運行

1. **克隆專案**
   ```bash
   git clone https://github.com/jhuangbp/claude_test.git
   cd claude_test
   ```

2. **安裝依賴**
   ```bash
   pip install -r requirements.txt
   ```

3. **啟動 Datasette**
   ```bash
   datasette serve \
     Marine_Revenue_FY20-FY24_detail.db \
     Marine_Revenue_FY20-FY24_summary_table.db \
     --host 0.0.0.0 \
     --port 8001 \
     --metadata metadata.yml \
     --config datasette.yml
   ```

4. **訪問應用**

   打開瀏覽器訪問：http://localhost:8001

   您可以：
   - 瀏覽兩個資料庫的所有表格
   - 執行 SQL 查詢分析收入數據
   - 使用 Datasette 的內建篩選和排序功能
   - 導出數據為 CSV 或 JSON 格式

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
├── Dockerfile                                    # Docker 配置
├── docker-compose.yml                            # Docker Compose 配置
├── requirements.txt                              # Python 依賴
├── Marine_Revenue_FY20-FY24_detail.db           # 月度收入明細資料庫 (776 KB)
├── Marine_Revenue_FY20-FY24_summary_table.db    # 年度收入彙總資料庫 (28 KB)
├── Marine_Revenue_FY20-FY24_detail.csv          # 原始 CSV 數據（明細）
├── Marine_Revenue_FY20-FY24_summary_table.csv   # 原始 CSV 數據（彙總）
├── metadata.yml                                  # Datasette 元數據配置
├── datasette.yml                                 # Datasette 設定配置
├── fly.toml                                      # Fly.io 部署配置
├── railway.toml                                  # Railway 部署配置
├── render.yaml                                   # Render 部署配置
└── README.md                                     # 本文件
```

## 配置說明

### metadata.yml

包含兩個資料庫的元數據配置：
- **Marine_Revenue_FY20-FY24_detail**: 月度收入明細資料庫配置
- **Marine_Revenue_FY20-FY24_summary_table**: 年度收入彙總資料庫配置

每個資料庫都有：
- 中文標題和描述
- 表格的標籤欄位設定
- 數據統計信息

### datasette.yml

Datasette 的運行時設定，包括：
- 默認頁面大小：20 筆記錄
- 最大返回行數：1000
- SQL 查詢時間限制：1000ms
- 支援 CSV 串流導出
- 自動建議分面（facet）功能

### 環境變數

可以通過環境變數覆蓋默認設定：

- `PORT`: 服務端口（默認 8001）
- `DATASETTE_SECRET`: 用於簽名 cookies

## 資料庫詳細說明

### revenue_detail 表（月度明細）

包含 7,309 筆美國海軍陸戰隊各基地的每月收入記錄：

- **地點範圍**: 日本（Camp Fuji, Camp Schwab, Camp Hansen, Camp Courtney, Camp Butler/Foster, Camp Kinser, Iwakuni）和韓國（Camp Mujuk）
- **時間範圍**: 2015-2019 年
- **收入類型**: Revenue（收入）和 NAFI Amt（NAFI 金額）
- **索引**: location, month, page

**範例查詢**：
```sql
-- 查詢特定基地的年度總收入
SELECT location, SUM(revenue) as total_revenue
FROM revenue_detail
WHERE location = 'Camp Butler/Foster'
GROUP BY location;

-- 查詢各基地月平均收入
SELECT location, AVG(revenue) as avg_monthly_revenue
FROM revenue_detail
WHERE revenue IS NOT NULL
GROUP BY location
ORDER BY avg_monthly_revenue DESC;
```

### revenue_summary 表（年度彙總）

包含 97 筆按國家和基地分類的年度收入彙總：

- **國家**: 日本、韓國
- **財政年度**: FY16, FY17, FY18, FY19, FY20
- **數據類型**: 各財政年度的總收入和年化收入
- **索引**: installation, country, page

**範例查詢**：
```sql
-- 比較各基地在不同年度的收入趨勢
SELECT installation, fy16, fy17, fy18, fy19, annualized_fy20
FROM revenue_summary
WHERE country = 'Japan'
ORDER BY annualized_fy20 DESC;

-- 計算各年度的總收入
SELECT
  SUM(fy16) as total_fy16,
  SUM(fy17) as total_fy17,
  SUM(fy18) as total_fy18,
  SUM(fy19) as total_fy19
FROM revenue_summary;
```

## 自定義與擴展

### 添加新資料庫

要添加自己的資料庫：

1. 將新的 SQLite 資料庫檔案放入專案根目錄
2. 更新 `metadata.yml` 添加新資料庫的配置
3. 修改 `Dockerfile` 的 COPY 和 CMD 指令
4. 更新 `docker-compose.yml`, `railway.toml` 等部署配置

### 從 CSV 創建資料庫

如果您有 CSV 檔案想轉換為 SQLite：

```python
import sqlite3
import csv

conn = sqlite3.connect('your_database.db')
cursor = conn.cursor()

# 創建表
cursor.execute('''CREATE TABLE your_table (...)''')

# 導入 CSV
with open('your_data.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        cursor.execute('INSERT INTO your_table VALUES (...)', tuple(row.values()))

conn.commit()
conn.close()
```

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
