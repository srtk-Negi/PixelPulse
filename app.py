from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from PixelBackend import models
from PixelBackend.database import engine
from PixelBackend.api import adminRoutes, carts, orders, products, users, discounts
from PixelBackend import auth

app = FastAPI()

app.include_router(adminRoutes.router, prefix="/api/admin")
app.include_router(carts.router, prefix="/api/cart")
app.include_router(orders.router, prefix="/api/order")
app.include_router(products.router, prefix="/api/product")
app.include_router(users.router, prefix="/api/user")
app.include_router(auth.router, prefix="/api/auth")
app.include_router(discounts.router, prefix="/api/discounts")

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
