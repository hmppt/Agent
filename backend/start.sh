#!/bin/bash

# 启动后端服务器

cd "$(dirname "$0")"

echo "Starting Agent Backend API..."
PYTHONPATH=src uv run uvicorn agent_backend.main:app --host 0.0.0.0 --port 8000 --reload
