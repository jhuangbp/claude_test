#!/bin/bash

# GitHub 設定腳本
# 此腳本會幫助您將 Pizza Slicer 連接到 GitHub

echo "🍕 Pizza Slicer - GitHub 設定腳本"
echo "=================================="
echo ""

# 檢查是否已設置遠端倉庫
if git remote -v | grep -q origin; then
    echo "✅ 已設置 GitHub 遠端倉庫："
    git remote -v
    echo ""
    read -p "是否要更新遠端倉庫 URL？(y/n): " update_remote
    if [ "$update_remote" == "y" ]; then
        read -p "請輸入新的 GitHub 倉庫 URL: " new_url
        git remote set-url origin "$new_url"
        echo "✅ 遠端倉庫 URL 已更新"
    fi
else
    echo "❌ 尚未設置 GitHub 遠端倉庫"
    echo ""
    echo "請按照以下步驟操作："
    echo ""
    echo "1. 在 GitHub 上創建新倉庫："
    echo "   - 前往 https://github.com/new"
    echo "   - 倉庫名稱建議：pizza-slicer"
    echo "   - 選擇 Public 或 Private"
    echo "   - 不要初始化 README、.gitignore 或 license（我們已經有了）"
    echo ""
    echo "2. 創建倉庫後，複製倉庫 URL（例如：https://github.com/YOUR_USERNAME/pizza-slicer.git）"
    echo ""
    read -p "請輸入您的 GitHub 倉庫 URL: " repo_url
    
    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo "✅ 已添加遠端倉庫：$repo_url"
    else
        echo "❌ 未輸入 URL，跳過遠端倉庫設置"
    fi
fi

echo ""
echo "檢查當前分支..."
current_branch=$(git branch --show-current)
echo "當前分支：$current_branch"

echo ""
read -p "是否要推送代碼到 GitHub？(y/n): " push_code

if [ "$push_code" == "y" ]; then
    if git remote -v | grep -q origin; then
        echo ""
        echo "推送代碼到 GitHub..."
        git push -u origin "$current_branch"
        echo ""
        echo "✅ 代碼已推送到 GitHub！"
        echo ""
        git remote get-url origin | sed 's/\.git$//' | xargs -I {} echo "🌐 倉庫網址: {}/"
    else
        echo "❌ 尚未設置遠端倉庫，無法推送"
    fi
fi

echo ""
echo "✅ GitHub 設定完成！"

