"""Chat API endpoints."""

import asyncio
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from typing import Dict

from agent_backend.api.models import ChatRequest, ChatResponse
from agent_backend.agent import get_agent

router = APIRouter(prefix="/api/chat", tags=["chat"])

# 并发限流：最多同时处理 10 个请求（避免触发 OpenAI API 限流）
MAX_CONCURRENT_REQUESTS = 10
semaphore = asyncio.Semaphore(MAX_CONCURRENT_REQUESTS)

# 用户会话存储（内存）
# 格式: {user_id: [{"role": "user", "content": "...", "timestamp": ...}, ...]}
user_sessions: Dict[str, list] = {}
SESSION_TTL = timedelta(hours=24)  # 会话保留 24 小时


async def cleanup_old_sessions():
    """定期清理超过 24 小时的会话"""
    while True:
        await asyncio.sleep(3600)  # 每小时执行一次
        now = datetime.now()
        cleaned = 0

        for user_id in list(user_sessions.keys()):
            session = user_sessions[user_id]
            if session and isinstance(session[-1], dict):
                # 检查最后一条消息的时间戳
                last_msg = session[-1]
                if "timestamp" in last_msg:
                    last_time = datetime.fromtimestamp(last_msg["timestamp"])
                    if now - last_time > SESSION_TTL:
                        del user_sessions[user_id]
                        cleaned += 1

        if cleaned > 0:
            print(f"Cleaned {cleaned} expired sessions")


# 启动会话清理任务
asyncio.create_task(cleanup_old_sessions())


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    """Simple chat endpoint (non-streaming)."""
    agent = get_agent()

    # Convert request to format expected by agent
    history = [{"role": msg.role, "content": msg.content} for msg in (request.history or [])]

    # Collect the full response
    full_response = ""
    async for chunk in agent.astream(request.message, history):
        full_response += chunk

    return ChatResponse(response=full_response)


@router.post("/stream")
async def chat_stream(request: Request, chat_req: ChatRequest):
    """Streaming chat endpoint using Server-Sent Events."""
    # 获取并发槽位（如果没有空闲槽位，会等待）
    async with semaphore:
        agent = get_agent()

        # 获取用户 ID
        user_id = chat_req.user_id or "default"

        # 获取该用户的历史记录
        history = user_sessions.get(user_id, [])

        async def generate():
            """Generate streaming response."""
            try:
                full_response = ""
                async for chunk in agent.astream(chat_req.message, history):
                    # 检查客户端是否断开
                    if await request.is_disconnected():
                        break
                    full_response += chunk
                    yield f"data: {chunk}\n\n"

                # 保存会话到内存
                timestamp = datetime.now().timestamp()
                user_message = {
                    "role": "user",
                    "content": chat_req.message,
                    "timestamp": timestamp
                }
                assistant_message = {
                    "role": "assistant",
                    "content": full_response,
                    "timestamp": timestamp
                }

                if user_id not in user_sessions:
                    user_sessions[user_id] = []

                user_sessions[user_id].extend([user_message, assistant_message])

                yield "data: [DONE]\n\n"
            except Exception as e:
                yield f"data: [ERROR] {str(e)}\n\n"

        return StreamingResponse(generate(), media_type="text/event-stream")


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}
