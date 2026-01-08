# 🚀 项目启动指南

## 前置要求

- Python 3.14.0+
- Node.js 18+
- uv (Python 包管理器)

---

## 快速启动（推荐）

### 方式 1：使用两个终端窗口

#### 终端 1：启动后端

```bash
cd backend
./start.sh
```

或者手动启动：

```bash
cd backend
uv run uvicorn agent_backend.main:app --host 0.0.0.0 --port 8000 --reload
```

**预期输出**：
```
Starting Agent Backend API...
Initializing Agent...
Agent ready!
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

#### 终端 2：启动前端

```bash
cd frontend
npm run dev
```

**预期输出**：
```
  VITE v5.4.10  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 方式 2：使用单个终端（后台运行）

```bash
# 启动后端（后台）
cd backend
./start.sh &
cd ..

# 启动前端
cd frontend
npm run dev
```

---

## 📋 详细启动步骤

### 第一步：启动后端

#### 1.1 进入后端目录

```bash
cd /Users/wangrensong/Project/Agent/backend
```

#### 1.2 确认环境变量

检查 `.env` 文件是否存在并正确配置：

```bash
cat .env
```

**必需配置**：
```env
# OpenAI API Configuration
OPENAI_API_KEY=your_api_key_here
OPENAI_API_BASE=https://open.bigmodel.cn/api/paas/v4/
OPENAI_MODEL=glm-4.5-flash

# FastAPI Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=True

# CORS Configuration
CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

#### 1.3 同步依赖

```bash
uv sync
```

#### 1.4 启动后端服务

**使用启动脚本（推荐）**：
```bash
./start.sh
```

**手动启动（调试用）**：
```bash
# 开发模式（自动重载）
uv run uvicorn agent_backend.main:app --host 0.0.0.0 --port 8000 --reload

# 生产模式（不重载）
uv run uvicorn agent_backend.main:app --host 0.0.0.0 --port 8000
```

#### 1.5 验证后端运行

打开新终端，测试 API：

```bash
# 测试健康检查
curl http://localhost:8000/health

# 预期输出: {"status":"healthy"}

# 测试根路径
curl http://localhost:8000/

# 预期输出包含: {"message":"Agent Backend API"...}
```

#### 1.6 查看 API 文档

浏览器访问：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

### 第二步：启动前端

#### 2.1 进入前端目录

```bash
cd /Users/wangrensong/Project/Agent/frontend
```

#### 2.2 安装依赖（首次运行）

```bash
npm install
```

#### 2.3 启动开发服务器

```bash
npm run dev
```

#### 2.4 验证前端运行

浏览器访问：http://localhost:5173

应该看到聊天界面。

---

## 🧪 测试完整流程

### 1. 打开浏览器

访问：http://localhost:5173

### 2. 发送测试消息

在聊天框输入：
```
你好
```

### 3. 观察响应

应该看到：
- ✅ 用户消息立即显示
- ✅ AI 逐字回复（流式输出）
- ✅ 响应速度 1-3 秒

### 4. 测试多轮对话

继续输入：
```
你还记得我问了什么吗？
```

应该看到 AI 记住了之前的对话。

---

## 🔍 常见问题排查

### 问题 1：后端启动失败

**症状**：
```
ModuleNotFoundError: No module named 'agent_backend'
```

**解决方案**：
```bash
cd backend
export PYTHONPATH=src
uv run uvicorn agent_backend.main:app --host 0.0.0.0 --port 8000 --reload
```

或者检查启动脚本是否正确：
```bash
cat start.sh
```

---

### 问题 2：API 连接失败

**症状**：
前端控制台显示：`Failed to fetch` 或 `ERR_CONNECTION_REFUSED`

**排查步骤**：

1. 检查后端是否运行：
```bash
curl http://localhost:8000/health
```

2. 检查端口是否被占用：
```bash
lsof -i :8000
```

3. 如果端口被占用，停止占用进程：
```bash
kill -9 <PID>
```

---

### 问题 3：CORS 错误

**症状**：
浏览器控制台显示：`Access to XMLHttpRequest has been blocked by CORS policy`

**解决方案**：

检查 `.env` 中的 CORS 配置：
```bash
# backend/.env
CORS_ORIGINS=["http://localhost:5173"]
```

重启后端服务。

---

### 问题 4：前端无法启动

**症状**：
```
Error: Cannot find module 'vite'
```

**解决方案**：
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

### 问题 5：Agent 初始化失败

**症状**：
后端日志显示：
```
Initializing Agent...
Error: Invalid API key
```

**解决方案**：

1. 检查 `.env` 中的 API Key：
```bash
cat backend/.env | grep OPENAI_API_KEY
```

2. 确认 API Key 有效：
```bash
curl https://open.bigmodel.cn/api/paas/v4/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

3. 如果使用智谱 AI，确保账户有余额：
   - 访问：https://open.bigmodel.cn/
   - 登录并查看余额

---

## 📊 性能监控

### 后端日志

启动后会看到：
```
Starting Agent Backend API...
Initializing Agent...
Agent ready!  ← Agent 预热成功
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 并发测试

使用多个浏览器标签页测试：
1. 打开 3-5 个标签页
2. 每个标签页发送不同的消息
3. 观察响应是否互不影响

---

## 🛑 停止服务

### 停止后端

在启动后端的终端按：
```
Ctrl + C
```

### 停止前端

在启动前端的终端按：
```
Ctrl + C
```

### 强制停止所有相关进程

```bash
# 停止后端（8000 端口）
lsof -ti :8000 | xargs kill -9

# 停止前端（5173 端口）
lsof -ti :5173 | xargs kill -9
```

---

## 🔧 开发技巧

### 1. 自动重载

**后端**：
- 使用 `--reload` 参数，代码修改后自动重启
- 启动命令已包含此参数

**前端**：
- Vite 默认支持热模块替换（HMR）
- 修改代码后浏览器自动刷新

### 2. 查看日志

**后端日志**：
- 终端直接查看输出
- 日志包含请求信息、错误堆栈等

**前端日志**：
- 浏览器开发者工具 → Console
- 查看 Network 标签页的 SSE 流

### 3. 调试技巧

**后端调试**：
```python
# 在代码中添加断点
import pdb; pdb.set_trace()

# 或使用 ipdb（更友好）
import ipdb; ipdb.set_trace()
```

**前端调试**：
- 在代码中添加 `debugger;`
- 使用 Chrome DevTools

---

## 📱 移动端访问

### 局域网访问

#### 1. 查看本机 IP

```bash
# macOS
ipconfig getifaddr en0

# 或
ifconfig | grep "inet "
```

假设输出：`192.168.1.100`

#### 2. 修改前端代理配置

```typescript
// frontend/vite.config.ts
export default defineConfig({
  server: {
    host: '0.0.0.0',  // 添加这一行
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://192.168.1.100:8000',  // 使用本机 IP
        changeOrigin: true,
      },
    },
  },
})
```

#### 3. 手机访问

- 确保手机和电脑在同一 Wi-Fi
- 浏览器访问：`http://192.168.1.100:5173`

---

## 🚀 生产部署（参考）

### 后端部署

```bash
# 不使用重载
uv run uvicorn agent_backend.main:app --host 0.0.0.0 --port 8000

# 使用多进程
uv run gunicorn agent_backend.main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```

### 前端部署

```bash
# 构建
npm run build

# 静态文件在 dist/ 目录
# 使用 Nginx 或其他 Web 服务器托管
```

---

## 📚 相关文档

- [Agent 单例模式文档](backend/docs/AGENT_SINGLETON.md)
- [项目整体说明](CLAUDE.md)
- [API 文档](http://localhost:8000/docs) (后端启动后访问)

---

## ✅ 启动检查清单

运行前确认：

- [ ] Python 版本 >= 3.14.0
- [ ] Node.js 已安装
- [ ] 后端 `.env` 文件已配置
- [ ] 后端依赖已安装（`uv sync`）
- [ ] 前端依赖已安装（`npm install`）
- [ ] 后端端口 8000 未被占用
- [ ] 前端端口 5173 未被占用
- [ ] API Key 有效且有余额

---

**最后更新**：2026-01-08
**适用版本**：v0.1.0
