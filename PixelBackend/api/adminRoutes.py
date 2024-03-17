from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from PixelBackend import models, schemas
from PixelBackend.database import get_db

router = APIRouter()


@router.get("/users", response_model=list[schemas.User])
def get_users(db: Session = Depends(get_db)):
    """Get all users from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.UserResponse]: A list of all users in the database.
    """
    users = db.query(models.User).all()
    return users


@router.get("/orders", response_model=list[schemas.Order])
def get_orders(db: Session = Depends(get_db)):
    """Get all orders from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.Order]: A list of all orders in the database.
    """
    orders = db.query(models.Order).all()
    return orders


@router.get("/products", response_model=list[schemas.Product])
def get_products(db: Session = Depends(get_db)):
    """Get all products from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.ProductResponse]: A list of all products in the database.
    """
    products = db.query(models.Product).all()
    return products


@router.get("/categories", response_model=list[schemas.Category])
def get_categories(db: Session = Depends(get_db)):
    """Get all categories from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.CategoryResponse]: A list of all categories in the database.
    """
    categories = db.query(models.Category).all()
    return categories


@router.get("/cart_items", response_model=list[schemas.CartItem])
def get_cart_items(db: Session = Depends(get_db)):
    """Get all cart items from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.CartItem]: A list of all cart items in the database.
    """
    cart_items = db.query(models.CartItem).all()
    return cart_items


@router.get("/order_items", response_model=list[schemas.OrderItem])
def get_order_items(db: Session = Depends(get_db)):
    """Get all order items from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.OrderItem]: A list of all order items in the database.
    """
    order_items = db.query(models.OrderItem).all()
    return order_items


@router.get("/carts", response_model=list[schemas.Cart])
def get_carts(db: Session = Depends(get_db)):
    """Get all carts from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.Cart]: A list of all carts in the database.
    """
    carts = db.query(models.Cart).all()
    return carts


# @router.get("/discounts", response_model=list[schemas.Discount])
# def get_discounts(db: Session = Depends(get_db)):
#     """Get all discounts from the database.

#     Args:
#         db (Session): The database session.

#     Returns:
#         list[schemas.Discount]: A list of all discounts in the database.
#     """
#     discounts = db.query(models.Discount).all()
#     return discounts


# @router.get("/discounted_products", response_model=list[schemas.DiscountedProduct])
# def get_discounted_products(db: Session = Depends(get_db)):
#     """Get all discounted products from the database.

#     Args:
#         db (Session): The database session.

#     Returns:
#         list[schemas.DiscountedProduct]: A list of all discounted products in the database.
#     """
#     discounted_products = db.query(models.DiscountedProduct).all()
#     return discounted_products
