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
    history: Optional[List[ChatMessage]] = None


class ChatResponse(BaseModel):
    """Chat response model."""

    response: str
