"""API request and response models."""

from pydantic import BaseModel
from typing import List, Optional


class ChatMessage(BaseModel):
    """Chat message model."""

    role: str
    content: str


class ChatRequest(BaseModel):
    """Chat request model."""

    message: str
    user_id: Optional[str] = None  # 用户唯一标识
    history: Optional[List[ChatMessage]] = None


class ChatResponse(BaseModel):
    """Chat response model."""

    response: str
