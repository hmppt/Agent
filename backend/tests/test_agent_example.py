"""Example test file showing how to use reset_agent() for testing."""

import pytest
from agent_backend.agent import get_agent, reset_agent, ChatAgent


def test_agent_singleton():
    """Test that get_agent returns the same instance."""
    reset_agent()  # Ensure clean state before test

    agent1 = get_agent()
    agent2 = get_agent()

    # Should be the same instance
    assert agent1 is agent2
    assert isinstance(agent1, ChatAgent)


def test_agent_reset():
    """Test that reset_agent creates a new instance."""
    reset_agent()

    agent1 = get_agent()
    agent1_id = id(agent1)

    # Reset the agent
    reset_agent()

    agent2 = get_agent()
    agent2_id = id(agent2)

    # Should be different instances
    assert agent1_id != agent2_id
    assert isinstance(agent2, ChatAgent)


def test_agent_with_custom_config():
    """Test agent with different configurations."""
    reset_agent()

    # Get first agent
    agent1 = get_agent()
    model1 = agent1.llm.model_name

    # Reset and get new agent
    reset_agent()
    agent2 = get_agent()
    model2 = agent2.llm.model_name

    # Both should use the same config from settings
    assert model1 == model2


@pytest.mark.asyncio
async def test_agent_stream():
    """Test agent streaming functionality."""
    reset_agent()

    agent = get_agent()

    # Test streaming (this will make an actual API call)
    chunks = []
    async for chunk in agent.astream("Hello", []):
        chunks.append(chunk)
        break  # Just test first chunk

    # Should receive at least some content
    assert len(chunks) > 0
