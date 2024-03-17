""" This file contains the Pydantic models for the database tables."""

from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class User(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    user_type: str
    phone: str
    address: str

    class Config:
        from_attributes = True


class UserResponseRegister(BaseModel):
    user_id: int
    first_name: str
    user_type: str

    class Config:
        from_attributes = True


class UserResponseLogin(UserResponseRegister):
    access_token: str
    token_type: str

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Product(BaseModel):
    name: str
    brand: str
    price: float
    description: str
    category: str
    image_url: str
    items_in_stock: int

    class Config:
        from_attributes = True


class ProductResponse(Product):
    prod_id: int

    class Config:
        from_attributes = True


class Category(BaseModel):
    name: str

    class Config:
        from_attributes = True


class CategoryResponse(Category):
    class Config:
        from_attributes = True


class OrderItem(BaseModel):
    prod_id: int
    prod_name: str
    quantity: int
    total_price: float


class OrderItemResponse(OrderItem):
    order_item_id: int

    class Config:
        from_attributes = True


class Cart(BaseModel):
    user_id: int


class CartResponse(Cart):
    cart_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class DiscountCode(BaseModel):
    code: str
    discount: float
    active: bool
    expiration_date: datetime


class DiscountCodeResponse(DiscountCode):
    discount_code_id: int

    class Config:
        from_attributes = True


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
        from_attributes = True


class OrderResponse(Order):
    order_id: int

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        from_attributes = True


class TokenData(BaseModel):
    user_id: Optional[str] = None

    class Config:
        from_attributes = True


########################################################


class CartItem(BaseModel):
    cart_id: int
    prod_id: int
    prod_name: str
    quantity: int
    total_price: float

    class Config:
        from_attributes = True


class CartItemResponse(BaseModel):
    prod_name: str

    class Config:
        from_attributes = True
