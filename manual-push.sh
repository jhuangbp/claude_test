#!/bin/bash

# 手動推送腳本 - 使用交互式認證

echo "🍕 Pizza Slicer - 手動推送到 GitHub"
echo "===================================="
echo ""
echo "請按照以下步驟操作："
echo ""
echo "1. 執行推送命令："
echo "   cd /Users/jyunru/Public/pizza-slicer"
echo "   git push -u origin pizza-slicer"
echo ""
echo "2. 當提示輸入認證資訊時："
echo "   Username: jhuangbp"
echo "   Password: 輸入您的 GitHub Personal Access Token"
echo "   （前往 https://github.com/settings/tokens 創建）"
echo ""
echo "3. 如果仍然失敗，請檢查："
echo "   - Token 是否在 GitHub 設置中包含了 'claude_test' 倉庫"
echo "   - Token 的 Contents 權限是否設置為 'Read and write'"
echo ""
echo "準備執行推送..."
echo ""

cd /Users/jyunru/Public/pizza-slicer

# 嘗試使用環境變數
export GIT_TERMINAL_PROMPT=1
export GIT_ASKPASS=echo

echo "執行: git push -u origin pizza-slicer"
echo "當提示時，請輸入："
echo "  Username: jhuangbp"
echo "  Password: 輸入您的 GitHub Personal Access Token"
echo ""

git push -u origin pizza-slicer

