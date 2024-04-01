from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from PixelBackend import schemas, models
from PixelBackend.database import get_db
from ..OAuth import get_current_user

router = APIRouter()


@router.get("/cartsItems", response_model=list[schemas.CartItemResponse])
def get_cart_items(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    """Get all cart items from the database for a specific user.

    Args:
        db (Session): The database session.
        current_user (dict): The current user.

    Returns:
        list[schemas.CartResponse]: A list of all cart items for the user.
    """
    user_id = current_user.user_id
    cart = db.query(models.Cart).filter_by(user_id=user_id).first()

    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart not found for the user.",
        )

    cart_items = db.query(models.CartItem).filter_by(cart_id=cart.cart_id).all()

    if not cart_items:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No items found in the cart.",
        )

    return cart_items


@router.post("/{prod_id}")
def add_to_cart(
    prod_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Add a product to the cart for a specific user.

    Args:
        prod_id (int): The id of the product to add to the cart.
        db (Session): The database session.
        current_user (dict): The current user.

    Returns:
        dict: A message indicating success or failure.
    """
    user_id = current_user.user_id
    print(user_id)
    cart = db.query(models.Cart).filter_by(user_id=user_id).first()

    if not cart:
        cart = models.Cart(user_id=user_id)
        db.add(cart)
        db.commit()

    cart = db.query(models.Cart).filter_by(user_id=user_id).first()

    product = db.query(models.Product).filter_by(prod_id=prod_id).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found.",
        )

    cart_item = (
        db.query(models.CartItem)
        .filter_by(cart_id=cart.cart_id, prod_id=prod_id)
        .first()
    )

    if cart_item:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product already exists in the cart.",
        )

    new_cart_item = models.CartItem(
        cart_id=cart.cart_id,
        prod_id=prod_id,
        prod_name=product.name,
        quantity=1,
        total_price=product.price,
    )
    db.add(new_cart_item)
    db.commit()

    return {"message": "Product added to cart successfully."}
