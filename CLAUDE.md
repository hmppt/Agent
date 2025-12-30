# CLAUDE.md

本文件用于指导 **Claude Code（claude.ai/code）** 在本代码仓库中进行开发与协作。

---

## 项目概述（Project Overview）

这是一个 **基于 Agent 的应用项目（Agent-based Application）**。  
项目将采用 **前后端分离架构**：

- **前端**：TypeScript + React  
- **后端**：Python 3.14+ + FastAPI  
- **Agent / LLM 框架**：LangChain + LangGraph  

后端使用 `uv` 作为 Python 包管理器，以获得更快、更稳定的依赖管理体验。

---

## 开发环境（Development Environment）

### 后端（Backend）

#### Python 与包管理器
- Python 版本：**3.14.0+**
- 包管理工具：**uv**

常用命令：

```bash
# 安装项目依赖
uv sync

# 添加依赖
uv add <package-name>

# 添加开发依赖
uv add --dev <package-name>

# 运行 Python 脚本
uv run python <script.py>

# 在虚拟环境中运行任意命令
uv run <command>
```
### Python Version
Python 3.14.0 is configured for this project. Ensure you're using the correct version:

```bash
uv python list
uv python pin 3.14
```

###前端（Frontend）
技术栈
- TypeScript
- React
- 推荐使用：
   - Vite / Next.js
   - ESLint + Prettier
   - React Query / Zustand（状态管理）
前端通过 HTTP / WebSocket 与 FastAPI 后端通信。

## 项目结构

推荐的整体项目结构如下：

```
.
├── frontend/               # 前端项目（TypeScript + React）
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                # 后端项目（FastAPI + Agent）
│   ├── src/
│   │   ├── agent/          # Agent 核心逻辑
│   │   ├── api/            # FastAPI 路由
│   │   ├── tools/          # Agent 工具定义
│   │   ├── prompts/        # Prompt 模板
│   │   ├── config/         # 配置管理
│   │   └── main.py         # FastAPI 入口
│   ├── tests/              # 后端测试
│   ├── pyproject.toml
│   └── CLAUDE.md
│
├── README.md
└── .env.example
```

## Architecture Guidelines

### Agent System Design
When building agent functionality, consider:

1. **Agent 架构模式**
   - ReAct（推理 + 行动）
   - 多 Agent 协作（不同角色、不同能力）
   - 分层 Agent（Planner / Executor / Tool Agent）
   - 基于 LangGraph 的状态机式 Agent

2. **工具（Tool）集成**
   - 所有工具应通过清晰、稳定的接口暴露
   - 工具需具备明确的输入 / 输出 schema

3. **记忆管理（Memory）**
   - 管理对话历史
   - 支持短期记忆与长期记忆
   - 可持久化（数据库 / 文件 / 向量库）

4. **错误处理**
   - LLM 输出异常时的兜底逻辑
   - 工具调用失败的回退策略
   - 网络 / API 限流处理

### 状态管理（State Management）

- 使用 LangGraph 管理复杂多步 Agent 工作流
- 明确区分：
   - 对话状态（messages）
   - Agent 内部状态
   - 工具输出
- 支持状态序列化，方便调试与复现问题

## Testing

```bash
# Run all tests
uv run pytest

# Run specific test file
uv run pytest tests/test_specific.py

# Run with coverage
uv run pytest --cov=src

# Run single test
uv run pytest tests/test_specific.py::test_function
```

## Code Quality

```bash
# Format code (if using ruff)
uv run ruff format .

# Lint code
uv run ruff check .

# Type checking (if using mypy)
uv run mypy src/
```

## LLM Integration

When working with LLM APIs:
- Store API keys in environment variables, never in code
- Use `.env` files for local development (add to .gitignore)
- Implement proper error handling for rate limits and API failures
- Consider using async I/O for concurrent LLM calls

## Common Development Patterns

### Adding New Tools
1. Define tool function in `tools/` directory
2. Add proper type hints and docstrings
3. Register tool with agent configuration
4. Add unit tests for tool behavior

### Modifying Agent Behavior
1. Update prompts in `prompts/` directory
2. Test changes with sample conversations
3. Validate tool outputs match expected schema
4. Update documentation if behavior changes significantly

## Configuration

Project configuration should be managed through:
- Environment variables for secrets (API keys, database URLs)
- `pyproject.toml` for dependencies and project metadata
- Configuration files in `config/` for application settings

## Updating This File

As the project evolves, update this file to include:
- Actual architectural decisions made
- Real commands used in development
- Specific patterns or conventions established
- Important file locations and their purposes
