"""Agent state management."""

from typing import Annotated, Sequence, TypedDict

from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages


class ChatAgentState(TypedDict):
    """State for the chat agent."""

    messages: Annotated[Sequence[BaseMessage], add_messages]
    """Chat message history."""
