from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.network_router import router as network_router

app = FastAPI(
    title="SatNexus Simulation API",
    description="Graph-Based Satellite Communication Network Resilience and Failure Recovery Engine",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Enable CORS for frontend development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 router
app.include_router(network_router, prefix="/api/v1")


@app.get("/health", tags=["Health"])
def health_check():
    """Service health and heartbeat check."""
    return {
        "status": "healthy",
        "service": "SatNexus Graph Simulation Engine",
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
