from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

captured_requests = []

@app.get("/")
def home():
    return {
        "message": "VAPT Backend Running"
    }

@app.get("/requests")
def get_requests():
    return captured_requests

@app.post("/add_request")
def add_request(data: dict):

    captured_requests.append(data)

    return {
        "status": "stored"
    }