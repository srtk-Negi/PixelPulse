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


class UserResponse(User):
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class UserResponseRegister(BaseModel):
    user_id: int
    user_type: str

    class Config:
        from_attributes = True


class UserResponseLogin(BaseModel):
    access_token: str
    token_type: str

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserPatchRequest(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    userType: Optional[str] = None

    class Config:
        from_attributes = True


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
    category_id: int

    class Config:
        from_attributes = True


class OrderItem(BaseModel):
    prod_id: int
    prod_name: str
    quantity: int
    total_price: float


class OrderItemResponse(OrderItem):
    order_item_id: int
    order_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class Cart(BaseModel):
    user_id: int


class CartResponse(Cart):
    cart_id: int
    cart_total: float
    created_at: datetime

    class Config:
        from_attributes = True


class DiscountCode(BaseModel):
    code: str
    discount: float
    is_active: bool
    expiration_date: datetime


class DiscountCodeResponse(DiscountCode):
    discount_code_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class DiscounCodeUserResponse(BaseModel):
    discount: float

    class Config:
        from_attributes = True


class CartItem(BaseModel):
    cart_id: int
    prod_id: int
    prod_name: str
    quantity: int
    total_price: float

    class Config:
        from_attributes = True


class CartItemResponse(BaseModel):
    cart_item_id: int
    cart_id: int
    prod_id: int
    prod_name: str
    quantity: int
    total_price: float
    price: float
    image_url: str
    category: str
    description: str

    class Config:
        from_attributes = True


class Order(BaseModel):
    orderTotal: float
    address: str
    payment_method: str
    order_status: str
    taxAmount: float
    discount: float
    discountCode: str

    class Config:
        from_attributes = True


class OrderToPlace(Order):
    cart: list[CartItemResponse]

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    order_id: int
    user_id: int
    created_at: datetime
    total_price: float
    address: str
    payment_method: str
    order_status: str
    tax: float
    discount: float
    discount_code: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        from_attributes = True


class TokenData(BaseModel):
    user_id: Optional[int] = None
    user_type: Optional[str] = None

    class Config:
        from_attributes = True
