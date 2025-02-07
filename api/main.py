from pydantic import BaseModel
from typing import Optional
from fastapi import FastAPI
from uuid import uuid4 as uuid
from routes.v1 import order
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(order.router, prefix="/api/v1")
