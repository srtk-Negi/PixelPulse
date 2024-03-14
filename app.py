from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import psycopg2
from psycopg2.extras import RealDictCursor
from time import sleep
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

class User(BaseModel):
    email: EmailStr
    password: str

while True:
    try:
        connection = psycopg2.connect(
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASSWORD"), 
            port=os.environ.get("DB_PORT"),   
            host=os.environ.get("DB_HOST"),
            database=os.environ.get("DB_NAME"),
            cursor_factory=RealDictCursor,
        )
        cursor = connection.cursor()
        print("Connected to PostgreSQL")
        break

    except Exception as e:
        print(e)
        sleep(2)



origins = [
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

users = []

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/login")
def login(credentials: User):
    if credentials in users:
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Incorrect email or password")


@app.post("/register", status_code=201)
def register(user: User):
    users.append(user)

    return {"message": "User registered"}


