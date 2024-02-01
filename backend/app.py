from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",  # Adjust this to the origin of your client application
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/data1")
def data_one():
    return {"message": "The is PixelPulse Data 1"}


@app.get("/api/data2")
def data_two():
    return {"message": "This is PixelPulse Data 2"}
