from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from PixelBackend import schemas, models
from PixelBackend.database import get_db
from ..OAuth import get_current_user

router = APIRouter()


@router.post(
    "/add",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.OrderResponse,
)
def add_order(
    request: Request,
    carts: schemas.Cart,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Add a new order to the database.

    Args:
        order (schemas.Order): The order to add.
        db (Session): The database session.
        current_user: The current user.

    Returns:
        schemas.OrderResponse: The order id of the order that was added.
    """
    user_id = current_user.user_id
    print(user_id)
    print(request)
    # cart = db.query(models.Cart).filter_by(user_id=user_id).first()
    # items_to_add = db.query(models.CartItem).filter_by(cart_id=cart.cart_id).all()

    # new_order = models.Order(user_id=user_id)
    # db.add(new_order)
    # db.commit()
    # for cart_item in items_to_add:
    #     order_item = db.query(models.OrderItem).filter_by(order_id=new_order.order_id)
    #     if order_item:
    #         pass
    #     new_order_item = models.OrderItem(
    #         order_id=new_order.order_id,
    #         prod_id=cart_item.prod_id,
    #         prod_name=cart_item.prod_name,
    #         quantity=cart_item.quantity,
    #         total_price=cart_item.total_price,
    #     )
    #     pass

    # return new_order
