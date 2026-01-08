"""FastAPI application entry point."""

import json
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from agent_backend.config import get_settings
from agent_backend.api import chat_router
from agent_backend.agent import get_agent


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager."""
    # Startup
    print("Starting Agent Backend API...")
    print("Initializing Agent...")
    _ = get_agent()  # 预热 Agent，避免第一个用户请求等待
    print("Agent ready!")
    yield
    # Shutdown
    print("Shutting down Agent Backend API...")


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    settings = get_settings()

    app = FastAPI(
        title="Agent Backend API",
        description="Chat agent API powered by LangGraph and FastAPI",
        version="0.1.0",
        lifespan=lifespan,
    )

    # Configure CORS
    cors_origins = json.loads(settings.cors_origins) if isinstance(settings.cors_origins, str) else settings.cors_origins
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routers
    app.include_router(chat_router)

    @app.get("/")
    async def root():
        """Root endpoint."""
        return {
            "message": "Agent Backend API",
            "version": "0.1.0",
            "docs": "/docs",
        }

    @app.get("/health")
    async def health():
        """Health check endpoint."""
        return {"status": "healthy"}

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn

    settings = get_settings()
    uvicorn.run(
        "agent_backend.main:app",
        host=settings.api_host,
        port=settings.api_port,
        reload=settings.api_reload,
    )
