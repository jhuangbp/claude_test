# Pizza Slicer - Cloud Storage 部署資訊

## ✅ 部署狀態：成功

### 部署詳情
- **Bucket 名稱**: `pizza-slicer-ba878`
- **專案 ID**: `ba878-474721`
- **區域**: `us-central1`
- **部署時間**: 2025-11-26

### 🌐 網站 URL

您可以使用以下 URL 訪問應用程式：

1. **主要 URL**:
   ```
   https://storage.googleapis.com/pizza-slicer-ba878/index.html
   ```

2. **替代 URL**:
   ```
   https://pizza-slicer-ba878.storage.googleapis.com/index.html
   ```

### 📁 已部署的檔案
- ✅ `index.html` (2.3 KB)
- ✅ `styles.css` (1.8 KB)
- ✅ `script.js` (10.3 KB)

### 🔧 管理命令

#### 更新部署
```bash
cd pizza-slicer
gsutil -m cp -r index.html styles.css script.js gs://pizza-slicer-ba878/
```

#### 查看 bucket 內容
```bash
gsutil ls gs://pizza-slicer-ba878/
```

#### 刪除部署
```bash
gsutil rm -r gs://pizza-slicer-ba878/
```

#### 設置 CORS（如果需要）
```bash
gsutil cors set cors.json gs://pizza-slicer-ba878
```

### 📝 注意事項
- 網站已設置為公開訪問
- 主頁設置為 `index.html`
- 所有文件使用標準儲存類別

### 🔗 相關連結
- [Google Cloud Console](https://console.cloud.google.com/storage/browser/pizza-slicer-ba878?project=ba878-474721)
- [GCP 專案](https://console.cloud.google.com/home/dashboard?project=ba878-474721)


