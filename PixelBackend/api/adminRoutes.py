from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from PixelBackend import models, schemas, OAuth
from PixelBackend.database import get_db

router = APIRouter()


@router.get("/users", response_model=list[schemas.UserResponse])
def get_users(
    db: Session = Depends(get_db), current_user=Depends(OAuth.get_current_user)
):
    """Get all users from the database.

    Args:
        db (Session): The database session.
        current_user: The current user.

    Returns:
        list[schemas.UserResponse]: A list of all users in the database.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    users = db.query(models.User).all()
    return users


@router.patch(
    "/users/update/{user_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=schemas.UserPatchRequest,
)
def update_user(
    user_id: int,
    user: schemas.UserPatchRequest,
    db: Session = Depends(get_db),
    current_user=Depends(OAuth.get_current_user),
):
    """Update a user.

    Args:
        user_id (int): The id of the user to update.
        user (schemas.User): The updated user.
        db (Session): The database session.
        current_user: The current user.

    Returns:
        schemas.User: The updated user.

    Raises:
        HTTPException: If the user does not exist.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )

    updated_data_dict = {
        "first_name": user.firstName,
        "last_name": user.lastName,
        "phone": user.phone,
        "address": user.address,
        "user_type": user.userType,
    }

    db_user_query = db.query(models.User).filter(models.User.user_id == user_id)
    db_user = db_user_query.first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user_query.update(updated_data_dict, synchronize_session=False)
    db.commit()

    return db_user_query.first()


@router.delete(
    "/users/delete/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(OAuth.get_current_user),
):
    """Delete a user from the database.

    Args:
        user_id (int): The id of the user to delete.
        db (Session): The database session.
        current_user: The current user.

    Returns:
        schemas.User: The user that was deleted.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    db_user_query = db.query(models.User).filter(models.User.user_id == user_id)
    db_user = db_user_query.first()
    if db_user:
        db.delete(db_user)
        db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    else:
        raise HTTPException(status_code=404, detail="User not found")


@router.get("/orders", response_model=list[schemas.OrderResponse])
def get_orders(
    db: Session = Depends(get_db), current_user=Depends(OAuth.get_current_user)
):
    """Get all orders from the database.

    Args:
        db (Session): The database session.
        current_user: The current user.

    Returns:
        list[schemas.Order]: A list of all orders in the database.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    orders = db.query(models.Order).all()
    return orders


@router.get("/orders/active", response_model=list[schemas.OrderResponse])
def get_active_orders(
    db: Session = Depends(get_db), current_user=Depends(OAuth.get_current_user)
):
    """Get all active orders from the database.

    Args:
        db (Session): The database session.
        current_user: The current user.

    Returns:
        list[schemas.Order]: A list of all active orders in the database.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    orders = db.query(models.Order).filter(models.Order.order_status == "active").all()
    return orders


@router.get("/orders/completed", response_model=list[schemas.OrderResponse])
def get_completed_orders(
    db: Session = Depends(get_db), current_user=Depends(OAuth.get_current_user)
):
    """Get all completed orders from the database.

    Args:
        db (Session): The database session.
        current_user: The current user.

    Returns:
        list[schemas.Order]: A list of all completed orders in the database.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    orders = (
        db.query(models.Order).filter(models.Order.order_status == "completed").all()
    )
    return orders


@router.get("/orders/sorted/{sort_by}", response_model=list[schemas.OrderResponse])
def sort_orders(
    sort_by: str,
    db: Session = Depends(get_db),
    current_user=Depends(OAuth.get_current_user),
):
    """Sort orders by a given field.

    Args:
        sort_by (str): The field to sort by.
        db (Session): The database session.
        current_user: The current user.

    Returns:
        list[schemas.Order]: A list of all orders sorted by the given field.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    if sort_by not in models.Order.__table__.columns:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid sort field"
        )
    orders = db.query(models.Order).order_by(sort_by).all()
    return orders


@router.get("/products", response_model=list[schemas.ProductResponse])
def get_products(
    db: Session = Depends(get_db), current_user=Depends(OAuth.get_current_user)
):
    """Get all products from the database.

    Args:
        db (Session): The database session.
        current_user: The current user.

    Returns:
        list[schemas.ProductResponse]: A list of all products in the database.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    products = db.query(models.Product).all()
    return products


@router.post(
    "/products/add",
    status_code=status.HTTP_201_CREATED,
)
def add_product(
    product: schemas.Product,
    db: Session = Depends(get_db),
    current_user=Depends(OAuth.get_current_user),
):
    """Add a new product to the database.

    Args:
        product (schemas.Product): The product to add.
        db (Session): The database session.
        current_user: The current user.

    Returns:
        schemas.ProductResponse: The product that was added.

    Raises:
        HTTPException: If the product already exists.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )

    try:
        db_product = (
            db.query(models.Product).filter(models.Product.name == product.name).first()
        )
    except Exception:
        pass

    if db_product:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Product already exists"
        )

    new_product = models.Product(**product.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return "Product added successfully"


@router.delete(
    "/products/delete/{prod_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product(
    prod_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(OAuth.get_current_user),
):
    """Delete a product from the database.

    Args:
        prod_id (int): The id of the product to delete.
        db (Session): The database session.
        current_user: The current user.

    Returns:
        schemas.ProductResponse: The product that was deleted.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
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


@router.patch(
    "/products/update/{prod_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=schemas.ProductResponse,
)
def update_product(
    prod_id: int,
    product: schemas.Product,
    db: Session = Depends(get_db),
    current_user=Depends(OAuth.get_current_user),
):
    """Update a product.

    Args:
        prod_id (int): The id of the product to update.
        product (schemas.Product): The updated product.
        db (Session): The database session.
        current_user: The current user.

    Returns:
        schemas.ProductResponse: The updated product.

    Raises:
        HTTPException: If the product does not exist.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    db_product_query = db.query(models.Product).filter(
        models.Product.prod_id == prod_id
    )
    db_product = db_product_query.first()

    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db_product_query.update(product.model_dump(), synchronize_session=False)
    db.commit()

    return db_product_query.first()


@router.get("/categories", response_model=list[schemas.CategoryResponse])
def get_categories(
    db: Session = Depends(get_db), current_user=Depends(OAuth.get_current_user)
):
    """Get all categories from the database.

    Args:
        db (Session): The database session.
        current_user: The current user.

    Returns:
        list[schemas.CategoryResponse]: A list of all categories in the database.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    categories = db.query(models.Category).all()
    return categories


@router.get("/order_items", response_model=list[schemas.OrderItemResponse])
def get_order_items(
    db: Session = Depends(get_db), current_user=Depends(OAuth.get_current_user)
):
    """Get all order items from the database.

    Args:
        db (Session): The database session.
        current_user: The current user.

    Returns:
        list[schemas.OrderItem]: A list of all order items in the database.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    order_items = db.query(models.OrderItem).all()
    return order_items


@router.get("/carts", response_model=list[schemas.CartResponse])
def get_carts(
    db: Session = Depends(get_db), current_user=Depends(OAuth.get_current_user)
):
    """Get all carts from the database.

    Args:
        db (Session): The database session.
        current_user: The current user.

    Returns:
        list[schemas.Cart]: A list of all carts in the database.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    carts = db.query(models.Cart).all()
    return carts


@router.get("/discounts", response_model=list[schemas.DiscountCodeResponse])
def get_discounts(
    db: Session = Depends(get_db), current_user=Depends(OAuth.get_current_user)
):
    """Get all discount codes from the database.

    Args:
        db (Session): The database session.
        current_user: The current user.

    Returns:
        list[schemas.DiscountCodeResponse]: A list of all discount codes in the database.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    discounts = db.query(models.DiscountCode).all()
    return discounts


@router.post(
    "/discounts/add",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.DiscountCodeResponse,
)
def add_discount(
    discount: schemas.DiscountCode,
    db: Session = Depends(get_db),
    current_user=Depends(OAuth.get_current_user),
):
    """Add a new discount code to the database.

    Args:
        discount (schemas.DiscountCode): The discount code to add.
        db (Session): The database session.
        current_user: The current user.

    Returns:
        schemas.DiscountCodeResponse: The discount code that was added.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
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


@router.delete(
    "/discounts/delete/{discount_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_discount(
    discount_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(OAuth.get_current_user),
):
    """Delete a discount code from the database.

    Args:
        discount_id (int): The id of the discount code to delete.
        db (Session): The database session.
        current_user: The current user.

    Returns:
        schemas.DiscountCode: The discount code that was deleted.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    try:
        db_discount = (
            db.query(models.DiscountCode)
            .filter(models.DiscountCode.discount_code_id == discount_id)
            .first()
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )

    if db_discount:
        db.delete(db_discount)
        db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    else:
        raise HTTPException(status_code=404, detail="Discount code not found")


@router.get("/cart_items", response_model=list[schemas.CartItemResponse])
def get_cart_items(
    db: Session = Depends(get_db), current_user=Depends(OAuth.get_current_user)
):
    """Get all cart items from the database.

    Args:
        db (Session): The database session.
        current_user: The current user.

    Returns:
        list[schemas.CartItem]: A list of all cart items in the database.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized user"
        )
    cart_items = (
        db.query(models.CartItem)
        .group_by(models.CartItem.cart_item_id, models.CartItem.cart_id)
        .all()
    )

    results = []
    for cart_item in cart_items:
        product = db.query(models.Product).filter_by(prod_id=cart_item.prod_id).first()
        new_cart_item = schemas.CartItemResponse(
            cart_item_id=cart_item.cart_item_id,
            cart_id=cart_item.cart_id,
            prod_id=cart_item.prod_id,
            prod_name=cart_item.prod_name,
            category=product.category,
            description=product.description,
            quantity=cart_item.quantity,
            total_price=cart_item.total_price,
            price=product.price,
            image_url=product.image_url,
        )
        results.append(new_cart_item)
    return results
