from fastapi import APIRouter, Depends, HTTPException, status, Response
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


@router.put(
    "/users/update/{user_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=schemas.User,
)
def update_user(user_id: int, user: schemas.User, db: Session = Depends(get_db)):
    """Update a user.

    Args:
        user_id (int): The id of the user to update.
        user (schemas.User): The updated user.
        db (Session): The database session.

    Returns:
        schemas.User: The updated user.

    Raises:
        HTTPException: If the user does not exist.
    """
    db_user_query = db.query(models.User).filter(models.User.user_id == user_id)
    db_user = db_user_query.first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user_query.update(user.model_dump(), synchronize_session=False)
    db.commit()

    return db_user_query.first()


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


@router.get("/orders/active", response_model=list[schemas.OrderResponse])
def get_active_orders(db: Session = Depends(get_db)):
    """Get all active orders from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.Order]: A list of all active orders in the database.
    """
    orders = db.query(models.Order).filter(models.Order.order_status == "active").all()
    return orders


@router.get("/orders/completed", response_model=list[schemas.OrderResponse])
def get_completed_orders(db: Session = Depends(get_db)):
    """Get all completed orders from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.Order]: A list of all completed orders in the database.
    """
    orders = (
        db.query(models.Order).filter(models.Order.order_status == "completed").all()
    )
    return orders


@router.get("/orders/sorted/{sort_by}", response_model=list[schemas.OrderResponse])
def sort_orders(sort_by: str, db: Session = Depends(get_db)):
    """Sort orders by a given field.

    Args:
        sort_by (str): The field to sort by.
        db (Session): The database session.

    Returns:
        list[schemas.Order]: A list of all orders sorted by the given field.
    """
    if sort_by not in models.Order.__table__.columns:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid sort field"
        )
    orders = db.query(models.Order).order_by(sort_by).all()
    return orders


@router.get("/products", response_model=list[schemas.ProductResponse])
def get_products(db: Session = Depends(get_db)):
    """Get all products from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.ProductResponse]: A list of all products in the database.
    """
    products = db.query(models.Product).all()
    return products


@router.get("/categories", response_model=list[schemas.CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    """Get all categories from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.CategoryResponse]: A list of all categories in the database.
    """
    categories = db.query(models.Category).all()
    return categories


@router.get("/order_items", response_model=list[schemas.OrderItemResponse])
def get_order_items(db: Session = Depends(get_db)):
    """Get all order items from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.OrderItem]: A list of all order items in the database.
    """
    order_items = db.query(models.OrderItem).all()
    return order_items


@router.get("/carts", response_model=list[schemas.CartResponse])
def get_carts(db: Session = Depends(get_db)):
    """Get all carts from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.Cart]: A list of all carts in the database.
    """
    carts = db.query(models.Cart).all()
    return carts


@router.post(
    "/product/add",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.ProductResponse,
)
def add_product(product: schemas.Product, db: Session = Depends(get_db)):
    """Add a new product to the database.

    Args:
        product (schemas.Product): The product to add.
        db (Session): The database session.

    Returns:
        schemas.ProductResponse: The product that was added.

    Raises:
        HTTPException: If the product already exists.
    """
    db_product = (
        db.query(models.Product).filter(models.Product.name == product.name).first()
    )

    if db_product:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Product already exists"
        )

    new_product = models.Product(**product.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@router.delete(
    "/product/delete/{prod_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product(prod_id: int, db: Session = Depends(get_db)):
    """Delete a product from the database.

    Args:
        prod_id (int): The id of the product to delete.
        db (Session): The database session.

    Returns:
        schemas.ProductResponse: The product that was deleted.
    """
    db_product_query = db.query(models.Product).filter(
        models.Product.prod_id == prod_id
    )
    db_product = db_product_query.first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    else:
        raise HTTPException(status_code=404, detail="Product not found")


@router.put(
    "/product/update/{prod_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=schemas.ProductResponse,
)
def update_product(
    prod_id: int, product: schemas.Product, db: Session = Depends(get_db)
):
    db_product_query = db.query(models.Product).filter(
        models.Product.prod_id == prod_id
    )
    db_product = db_product_query.first()

    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db_product_query.update(product.model_dump(), synchronize_session=False)
    db.commit()

    return db_product_query.first()


@router.post(
    "/discount/add",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.DiscountCodeResponse,
)
def add_discount(discount: schemas.DiscountCode, db: Session = Depends(get_db)):
    """Add a new discount code to the database.

    Args:
        discount (schemas.DiscountCode): The discount code to add.
        db (Session): The database session.

    Returns:
        schemas.DiscountCodeResponse: The discount code that was added.
    """
    db_discount = (
        db.query(models.DiscountCode)
        .filter(models.DiscountCode.code == discount.code)
        .first()
    )

    if db_discount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Discount code already exists",
        )

    new_discount = models.DiscountCode(**discount.model_dump())
    db.add(new_discount)
    db.commit()
    db.refresh(new_discount)

    return new_discount
