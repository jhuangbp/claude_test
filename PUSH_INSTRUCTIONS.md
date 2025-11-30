# 推送到 GitHub 的指令

## 方法 1：使用 Token 在 URL 中（快速）

在終端機中執行：

```bash
cd /Users/jyunru/Public/pizza-slicer
git remote set-url origin https://YOUR_TOKEN@github.com/jhuangbp/claude_test.git
git push -u origin pizza-slicer
```

## 方法 2：手動輸入認證（推薦，更安全）

在終端機中執行：

```bash
cd /Users/jyunru/Public/pizza-slicer
git push -u origin pizza-slicer
```

當提示輸入時：
- **Username**: `jhuangbp`
- **Password**: 輸入您的 token（前往 https://github.com/settings/tokens 創建）

## 方法 3：使用 Git Credential Store

```bash
cd /Users/jyunru/Public/pizza-slicer
git config credential.helper store
git push -u origin pizza-slicer
# 輸入用戶名和 token 一次，之後會自動保存
```

## 如果遇到 403 錯誤

可能的原因：
1. Token 已過期或無效
2. Token 沒有 `repo` 權限
3. Token 格式不正確

解決方案：
1. 前往 https://github.com/settings/tokens
2. 檢查 token 是否還有 `repo` 權限
3. 如果沒有，創建新的 token 並確保勾選 `repo` 權限

## 推送成功後

您可以在以下網址查看：
- 倉庫：https://github.com/jhuangbp/claude_test
- Pizza Slicer 分支：https://github.com/jhuangbp/claude_test/tree/pizza-slicer

