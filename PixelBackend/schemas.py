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

    class Config:
        orm_mode = True


class UserResponse(BaseModel):
    user_id: int
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    address: str


class Product(BaseModel):
    prod_id: int
    name: str
    brand: str
    price: float
    description: str
    category: str
    image_url: str
    items_in_stock: int

    class Config:
        orm_mode = True


class ProductUpdate(BaseModel):
    name: str
    brand: str
    price: float
    description: str
    category: str
    image_url: str
    items_in_stock: int


class ProductResponse(BaseModel):
    prod_id: int
    name: str
    brand: str
    price: float
    description: str
    category: str
    image_url: str
    items_in_stock: int

    class Config:
        orm_mode = True


class Category(BaseModel):
    name: str

    class Config:
        orm_mode = True


class CategoryResponse(BaseModel):
    name: str

    class Config:
        orm_mode = True


class Cart(BaseModel):
    user_id: int

    class Config:
        orm_mode = True


class CartResponse(BaseModel):
    created_at: datetime

    class Config:
        orm_mode = True


class CartItem(BaseModel):
    cart_id: int
    prod_id: int
    prod_name: str
    quantity: int
    total_price: float

    class Config:
        orm_mode = True


class CartItemResponse(BaseModel):
    prod_name: str

    class Config:
        orm_mode = True


class Order(BaseModel):
    user_id: int
    total_price: float
    address: str
    payment_method: str
    order_status: str
    tax: float
    discount: float
    discount_code: str

    class Config:
        orm_mode = True


class OrderResponse(BaseModel):
    order_id: int

    class Config:
        orm_mode = True


class OrderItem(BaseModel):
    order_id: int
    prod_id: int
    prod_name: str
    quantity: int
    total_price: float

    class Config:
        orm_mode = True


class DiscountCode(BaseModel):
    code: str
    discount: float
    active: bool
    expiration_date: datetime

    class Config:
        orm_mode = True


class DiscountCodeResponse(BaseModel):
    code: str
    discount: float
    active: bool
    expiration_date: datetime

    class Config:
        orm_mode = True
