# AI Chat Agent

一个基于 LangGraph 和 FastAPI 的 AI 聊天 Agent 应用，支持流式响应。

## 技术栈

### 后端
- Python 3.14+
- FastAPI - Web 框架
- LangChain + LangGraph - Agent 框架
- OpenAI API - LLM 提供商
- uv - Python 包管理器

### 前端
- TypeScript
- React 18
- Vite - 构建工具
- CSS3 - 样式

## 项目结构

```
Agent/
├── backend/                 # 后端项目
│   ├── src/
│   │   ├── agent_backend/  # Agent 核心逻辑
│   │   │   ├── agent/      # Agent 实现
│   │   │   ├── api/        # FastAPI 路由
│   │   │   ├── config/     # 配置管理
│   │   │   └── main.py     # FastAPI 入口
│   ├── tests/              # 测试文件
│   └── pyproject.toml      # Python 依赖
│
├── frontend/                # 前端项目
│   ├── src/
│   │   ├── components/     # React 组件
│   │   ├── hooks/          # 自定义 Hooks
│   │   ├── services/       # API 服务
│   │   └── types/          # TypeScript 类型
│   └── package.json        # Node 依赖
│
├── CLAUDE.md                # Claude Code 开发指南
└── README.md                # 本文件
```

## 快速开始

### 1. 环境准备

确保已安装：
- Python 3.14+
- Node.js 18+
- uv 包管理器

### 2. 后端设置

```bash
cd backend

# 安装依赖
uv sync

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的 OpenAI API Key

# 启动后端服务
PYTHONPATH=src uv run uvicorn agent_backend.main:app --host 0.0.0.0 --port 8000 --reload

# 或者使用启动脚本
./start.sh
```

后端将运行在 `http://localhost:8000`

API 文档：`http://localhost:8000/docs`

### 3. 前端设置

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端将运行在 `http://localhost:5173`

## 开发指南

### 后端开发

```bash
# 运行测试
uv run pytest

# 代码格式化
uv run ruff format .

# 代码检查
uv run ruff check .

# 类型检查
uv run mypy src/
```

### 前端开发

```bash
# 代码检查
npm run lint

# 修复问题
npm run lint:fix

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## API 端点

### POST /api/chat/
普通聊天端点（非流式）

**请求体：**
```json
{
  "message": "你好",
  "history": [
    {"role": "user", "content": "之前的消息"},
    {"role": "assistant", "content": "之前的回复"}
  ]
}
```

**响应：**
```json
{
  "response": "你好！我是 AI Agent，很高兴为您服务。"
}
```

### POST /api/chat/stream
流式聊天端点（Server-Sent Events）

**请求体：**同上

**响应：**
```
data: 你好
data: ！
data: 我是 AI Agent
data: [DONE]
```

### GET /health
健康检查端点

## 配置说明

### 后端环境变量 (.env)

| 变量 | 说明 | 默认值 |
|------|------|--------|
| OPENAI_API_KEY | OpenAI API 密钥 | 必填 |
| OPENAI_API_BASE | OpenAI API 地址 | https://api.openai.com/v1 |
| OPENAI_MODEL | 使用的模型 | gpt-4o-mini |
| API_HOST | API 监听地址 | 0.0.0.0 |
| API_PORT | API 端口 | 8000 |
| CORS_ORIGINS | 允许跨域来源 | ["http://localhost:5173"] |

## 扩展 Agent 功能

### 添加自定义工具

在 `backend/src/agent_backend/tools/` 目录创建工具函数：

```python
from langchain_core.tools import tool

@tool
def my_custom_tool(input: str) -> str:
    """工具描述"""
    # 实现工具逻辑
    return result
```

然后在 `backend/src/agent_backend/agent/graph.py` 中注册工具。

### 修改 Agent 提示词

在 `backend/src/agent_backend/prompts/` 目录创建或修改 prompt 模板。

## License

MIT
