#!/bin/bash

# 停止所有服务脚本

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   停止 Agent 服务${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 停止后端 (8000)
echo -e "${BLUE}[1/2]${NC} 停止后端服务..."
BACKEND_PIDS=$(lsof -ti :8000 2>/dev/null || true)
if [ -n "$BACKEND_PIDS" ]; then
    echo $BACKEND_PIDS | xargs kill -9
    echo -e "${GREEN}✓ 后端已停止${NC}"
else
    echo -e "${YELLOW}⚠️  后端未运行${NC}"
fi

# 停止前端 (5173)
echo -e "${BLUE}[2/2]${NC} 停止前端服务..."
FRONTEND_PIDS=$(lsof -ti :5173 2>/dev/null || true)
if [ -n "$FRONTEND_PIDS" ]; then
    echo $FRONTEND_PIDS | xargs kill -9
    echo -e "${GREEN}✓ 前端已停止${NC}"
else
    echo -e "${YELLOW}⚠️  前端未运行${NC}"
fi

echo ""
echo -e "${GREEN}✓ 所有服务已停止${NC}"
