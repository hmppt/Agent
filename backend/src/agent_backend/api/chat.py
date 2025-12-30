"""Chat API endpoints."""

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from agent_backend.api.models import ChatRequest, ChatResponse
from agent_backend.agent import get_agent

router = APIRouter(prefix="/api/chat", tags=["chat"])


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
async def chat_stream(request: ChatRequest):
    """Streaming chat endpoint using Server-Sent Events."""
    agent = get_agent()

    # Convert request to format expected by agent
    history = [{"role": msg.role, "content": msg.content} for msg in (request.history or [])]

    async def generate():
        """Generate streaming response."""
        async for chunk in agent.astream(request.message, history):
            yield f"data: {chunk}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}
