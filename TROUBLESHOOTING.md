# GitHub 推送問題排查

## 當前問題：403 Permission Denied

這通常表示 token 權限不足或格式問題。

## 解決方案

### 1. 檢查 Token 權限

請前往 https://github.com/settings/tokens 檢查您的 token：

**Fine-grained token (github_pat_...) 需要：**
- Repository access: 選擇 "Only select repositories" 或 "All repositories"
- 確保選擇了 `claude_test` 倉庫
- Permissions → Repository permissions → Contents: Read and write
- Permissions → Repository permissions → Metadata: Read-only

**Classic token (ghp_...) 需要：**
- 勾選 `repo` 權限（完整倉庫權限）

### 2. 創建新的 Classic Token（推薦）

1. 前往：https://github.com/settings/tokens/new
2. Note: 輸入 "Pizza Slicer Push"
3. Expiration: 選擇合適的過期時間
4. 勾選權限：**repo** (完整倉庫權限)
5. 點擊 "Generate token"
6. **立即複製 token**（只會顯示一次）

### 3. 使用新 Token 推送

```bash
cd /Users/jyunru/Public/pizza-slicer

# 方法 A: 直接在 URL 中使用（臨時）
git remote set-url origin https://YOUR_NEW_TOKEN@github.com/jhuangbp/claude_test.git
git push -u origin pizza-slicer

# 方法 B: 使用 credential helper（推薦）
git remote set-url origin https://github.com/jhuangbp/claude_test.git
git push -u origin pizza-slicer
# 當提示時：
# Username: jhuangbp
# Password: 貼上您的新 token
```

### 4. 驗證 Token 是否有效

```bash
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user
```

如果返回您的用戶資訊，表示 token 有效。

## 當前狀態

- ✅ Git 倉庫已初始化
- ✅ 遠端倉庫已連接：https://github.com/jhuangbp/claude_test.git
- ✅ 代碼已提交到本地 `pizza-slicer` 分支
- ⚠️  等待推送到 GitHub（需要有效的 token）

## 替代方案：使用 SSH

如果您有設置 SSH key：

```bash
cd /Users/jyunru/Public/pizza-slicer
git remote set-url origin git@github.com:jhuangbp/claude_test.git
git push -u origin pizza-slicer
```

