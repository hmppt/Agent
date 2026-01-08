#!/bin/bash

# 一键启动前后端脚本

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Agent 应用启动脚本${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 检查端口占用
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo -e "${YELLOW}⚠️  端口 $port 已被占用${NC}"
        read -p "是否停止占用进程并继续？(y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            lsof -ti :$port | xargs kill -9
            echo -e "${GREEN}✓ 已停止端口 $port 的进程${NC}"
        else
            echo -e "${RED}✗ 启动取消${NC}"
            exit 1
        fi
    fi
}

# 检查端口
echo -e "${BLUE}[1/4]${NC} 检查端口占用..."
check_port 8000
check_port 5173
echo -e "${GREEN}✓ 端口检查完成${NC}"
echo ""

# 启动后端
echo -e "${BLUE}[2/4]${NC} 启动后端服务..."
cd "$(dirname "$0")/backend"

# 检查 .env 文件
if [ ! -f .env ]; then
    echo -e "${RED}✗ 未找到 .env 文件${NC}"
    echo -e "${YELLOW}请先创建 backend/.env 文件并配置 API Key${NC}"
    exit 1
fi

# 后台启动后端
PYTHONPATH=src uv run uvicorn agent_backend.main:app --host 0.0.0.0 --port 8000 --reload > /tmp/agent-backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✓ 后端已启动 (PID: $BACKEND_PID)${NC}"

# 等待后端启动
echo -ne "${YELLOW}等待后端就绪..."
for i in {1..30}; do
    if curl -s http://localhost:8000/health >/dev/null 2>&1; then
        echo -e " ${GREEN}✓${NC}"
        break
    fi
    echo -n "."
    sleep 1
done
echo ""

# 启动前端
echo -e "${BLUE}[3/4]${NC} 启动前端服务..."
cd "../frontend"

# 检查 node_modules
if [ ! -d node_modules ]; then
    echo -e "${YELLOW}首次运行，安装前端依赖...${NC}"
    npm install
fi

# 前台启动前端
echo -e "${GREEN}✓ 前端正在启动...${NC}"
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   🎉 启动成功！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}后端地址:${NC} http://localhost:8000"
echo -e "${BLUE}前端地址:${NC} http://localhost:5173"
echo -e "${BLUE}API 文档:${NC} http://localhost:8000/docs"
echo ""
echo -e "${YELLOW}后端日志: tail -f /tmp/agent-backend.log${NC}"
echo -e "${YELLOW}停止服务: Ctrl+C (或运行 ./stop-all.sh)${NC}"
echo ""
echo -e "${BLUE}========================================${NC}"
echo ""

# 启动前端（前台）
npm run dev

# 清理：如果前端退出，也停止后端
echo -e "${YELLOW}正在停止后端服务...${NC}"
kill $BACKEND_PID 2>/dev/null || true
echo -e "${GREEN}✓ 所有服务已停止${NC}"
