from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from PixelBackend import models
from PixelBackend.database import engine
from PixelBackend.api import adminRoutes, carts, categories, orders, products, users
from PixelBackend import auth

app = FastAPI()

app.include_router(adminRoutes.router)
app.include_router(carts.router)
app.include_router(categories.router)
app.include_router(orders.router)
app.include_router(products.router)
app.include_router(users.router)
app.include_router(auth.router)

models.Base.metadata.create_all(bind=engine)


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


@app.get("/")
def root():
    return {"message": "Hello World"}
