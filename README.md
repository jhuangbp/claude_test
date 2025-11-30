# 🍕 Pizza Slicer - ADHD Friendly App

一個友善的 ADHD 應用程式，幫助用戶以創意的方式切割披薩，確保每個人獲得相等的份量。

## ✨ 功能特色

- 🎨 **多種切割模式**：提供 5 種創新的切割模式
  - Criss-cross Grid（交叉網格）
  - Parallel Chords（平行弦）
  - Spiral（螺旋）
  - Concentric Rings（同心圓）
  - Puzzle（拼圖式）

- ✅ **等面積驗證**：自動計算並驗證每個切片的面積，確保公平分配

- 🎯 **ADHD 友善設計**：
  - 清晰的視覺回饋
  - 簡單直觀的介面
  - 即時動畫效果
  - 高對比度配色

## 🚀 快速開始

### 本地運行

1. 克隆倉庫：
```bash
git clone https://github.com/YOUR_USERNAME/pizza-slicer.git
cd pizza-slicer
```

2. 使用 Python 簡單伺服器運行：
```bash
python3 -m http.server 8000
```

3. 在瀏覽器中打開：`http://localhost:8000`

## 📦 部署

### Google Cloud Storage
已部署到：`gs://pizza-slicer-ba878`

訪問網址：
- https://storage.googleapis.com/pizza-slicer-ba878/index.html

### 更新部署
```bash
gsutil -m cp -r index.html styles.css script.js gs://pizza-slicer-ba878/
```

## 🛠️ 技術棧

- HTML5
- CSS3
- Vanilla JavaScript
- Canvas API

## 📝 使用說明

1. 輸入披薩尺寸（8-24 英寸）
2. 輸入分享人數（1-12 人）
3. 選擇切割模式
4. 點擊 "Slice the Pizza! 🍕" 按鈕
5. 查看視覺化的切割結果和詳細說明

## 📄 授權

MIT License

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

