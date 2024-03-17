""" This file contains the Pydantic models for the database tables."""

from pydantic import BaseModel, EmailStr
from datetime import datetime


class User(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    phone: str
    address: str


class UserResponse(BaseModel):
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    address: str


class Product(BaseModel):
    name: str
    brand: str
    price: float
    description: str
    category: str
    image_url: str
    items_in_stock: int


class ProductUpdate(BaseModel):
    name: str
    brand: str
    price: float
    description: str
    category: str
    image_url: str
    items_in_stock: int


class ProductResponse(BaseModel):
    name: str
    brand: str
    price: float
    description: str
    category: str
    image_url: str
    items_in_stock: int


class Category(BaseModel):
    name: str


class Cart(BaseModel):
    user_id: int


class CartItem(BaseModel):
    cart_id: int
    prod_id: int
    quantity: int
    total_price: float


class Order(BaseModel):
    user_id: int
    total_price: float
    address: str
    payment_method: str
    order_status: str
    tax: float
    discount: float
    discount_code: str


class OrderItem(BaseModel):
    order_id: int
    prod_id: int
    quantity: int
    total_price: float


class DiscountCode(BaseModel):
    code: str
    discount: float
    active: bool
    expiration_date: datetime


class DiscountCodeResponse(BaseModel):
    code: str
    discount: float
    active: bool
    expiration_date: datetime
