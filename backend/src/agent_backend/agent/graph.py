"""Chat agent implementation using LangGraph."""

from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, START, END

from agent_backend.config import get_settings
from agent_backend.agent.state import ChatAgentState


class ChatAgent:
    """A simple chat agent using LangGraph."""

    def __init__(self):
        """Initialize the chat agent."""
        settings = get_settings()
        self.llm = ChatOpenAI(
            model=settings.openai_model,
            api_key=settings.openai_api_key,
            base_url=settings.openai_api_base,
            temperature=0.7,
        )
        self.graph = self._build_graph()

    def _build_graph(self) -> StateGraph:
        """Build the agent graph."""
        graph = StateGraph(ChatAgentState)

        # Add nodes
        graph.add_node("chatbot", self._chatbot_node)

        # Add edges
        graph.add_edge(START, "chatbot")
        graph.add_edge("chatbot", END)

        return graph.compile()

    async def _chatbot_node(self, state: ChatAgentState) -> ChatAgentState:
        """Process messages through the LLM."""
        messages = state["messages"]
        response = await self.llm.ainvoke(messages)
        return {"messages": [response]}

    async def astream(self, user_input: str, history: list = None):
        """Stream chat responses."""
        from langchain_core.messages import HumanMessage, AIMessage

        messages = []

        # Convert history to LangChain messages
        if history:
            for msg in history:
                if msg["role"] == "user":
                    messages.append(HumanMessage(content=msg["content"]))
                elif msg["role"] == "assistant":
                    messages.append(AIMessage(content=msg["content"]))

        # Add current user input
        messages.append(HumanMessage(content=user_input))

        # Stream the response
        async for event in self.graph.astream({"messages": messages}):
            for node_name, node_output in event.items():
                if "messages" in node_output:
                    for message in node_output["messages"]:
                        yield message.content


# Global agent instance (singleton pattern)
_agent_instance: ChatAgent | None = None
_initialized: bool = False


def get_agent() -> ChatAgent:
    """
    Get or create the global agent instance.

    Uses singleton pattern to ensure only one agent instance exists.
    The agent is initialized on first call and reused for all subsequent calls.

    Returns:
        ChatAgent: The global chat agent instance
    """
    global _agent_instance, _initialized

    if not _initialized:
        # Ensure initialization happens only once
        _agent_instance = ChatAgent()
        _initialized = True

    return _agent_instance


def reset_agent() -> None:
    """
    Reset the global agent instance.

    WARNING: This should only be used in tests!
    Resets the agent to None, allowing a new instance to be created
    on the next call to get_agent().
    """
    global _agent_instance, _initialized
    _agent_instance = None
    _initialized = False
