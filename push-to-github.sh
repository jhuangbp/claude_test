#!/bin/bash

# GitHub 推送腳本
# 此腳本會幫助您將 Pizza Slicer 推送到 GitHub

echo "🍕 Pizza Slicer - 推送到 GitHub"
echo "================================"
echo ""

cd /Users/jyunru/Public/pizza-slicer

# 檢查遠端倉庫
echo "檢查遠端倉庫設定..."
git remote -v
echo ""

# 檢查當前分支
current_branch=$(git branch --show-current)
echo "當前分支：$current_branch"
echo ""

# 檢查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  發現未提交的更改："
    git status --short
    echo ""
    read -p "是否要先提交這些更改？(y/n): " commit_changes
    if [ "$commit_changes" == "y" ]; then
        git add .
        read -p "請輸入提交訊息（或按 Enter 使用預設訊息）: " commit_msg
        if [ -z "$commit_msg" ]; then
            commit_msg="Update pizza-slicer files"
        fi
        git commit -m "$commit_msg"
    fi
fi

echo ""
echo "準備推送到 GitHub..."
echo "遠端倉庫：https://github.com/jhuangbp/claude_test.git"
echo "分支：$current_branch"
echo ""

# 嘗試推送
echo "執行推送..."
if git push -u origin "$current_branch"; then
    echo ""
    echo "✅ 成功推送到 GitHub！"
    echo ""
    echo "🌐 倉庫網址：https://github.com/jhuangbp/claude_test"
    echo "📁 分支：$current_branch"
    echo ""
    echo "您可以在以下網址查看："
    echo "https://github.com/jhuangbp/claude_test/tree/$current_branch"
else
    echo ""
    echo "❌ 推送失敗"
    echo ""
    echo "可能的原因："
    echo "1. 需要 GitHub 認證"
    echo "2. 沒有推送權限"
    echo ""
    echo "解決方案："
    echo "1. 使用 Personal Access Token："
    echo "   - 前往 https://github.com/settings/tokens"
    echo "   - 創建新的 token（需要 repo 權限）"
    echo "   - 推送時使用：git push -u origin $current_branch"
    echo "   - 用戶名：jhuangbp"
    echo "   - 密碼：輸入您的 token"
    echo ""
    echo "2. 或使用 SSH（需要先設置 SSH key）："
    echo "   git remote set-url origin git@github.com:jhuangbp/claude_test.git"
    echo "   git push -u origin $current_branch"
fi

