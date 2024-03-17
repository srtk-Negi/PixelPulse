from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from PixelBackend import schemas, models
from PixelBackend.database import get_db

router = APIRouter()


@router.post(
    "/cart/add",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.CartResponse,
)
def add_cart(cart: schemas.Cart, db: Session = Depends(get_db)):
    """Add a new cart to the database.

    Args:
        cart (schemas.Cart): The cart to add.
        db (Session): The database session.

    Returns:
        schemas.CartResponse: The creation time of cart that was added.
    """
    new_cart = models.Cart(**cart.model_dump())
    db.add(new_cart)
    db.commit()
    db.refresh(new_cart)
    return new_cart


@router.delete(
    "/cart/delete/{cart_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_cart(cart_id: int, db: Session = Depends(get_db)):
    """Delete a cart from the database.

    Args:
        cart_id (int): The id of the cart to delete.
        db (Session): The database session.

    Returns:
        dict: A message indicating the cart was deleted.
    """
    db_cart = db.query(models.Cart).filter(models.Cart.cart_id == cart_id).first()
    if db_cart:
        db.delete(db_cart)
        db.commit()
        return {"message": "Cart deleted"}
    else:
        raise HTTPException(status_code=404, detail="Cart not found")
