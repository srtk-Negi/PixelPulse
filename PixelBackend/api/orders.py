from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from PixelBackend import schemas, models
from PixelBackend.database import get_db
from ..OAuth import get_current_user

router = APIRouter()


@router.post(
    "/add",
    status_code=status.HTTP_201_CREATED,
)
def add_order(
    order_data: schemas.OrderToPlace,
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
    order_data = order_data.model_dump()

    try:
        order = models.Order(
            user_id=user_id,
            total_price=order_data["orderTotal"],
            address=order_data["address"],
            payment_method=order_data["payment_method"],
            order_status=order_data["order_status"],
            tax=order_data["taxAmount"],
            discount=order_data["discount"],
            discount_code=order_data["discountCode"],
        )
        db.add(order)
        db.commit()
        db.refresh(order)
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error occurred while adding order to the database.",
        )

    order_items = []
    for item in order_data["cart"]:
        order_item = models.OrderItem(
            order_id=order.order_id,
            prod_id=item["prod_id"],
            prod_name=item["prod_name"],
            quantity=item["quantity"],
            total_price=item["total_price"],
        )
        order_items.append(order_item)

    try:
        db.add_all(order_items)
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error occurred while adding order items to the database.",
        )

    return {"order_id": order.order_id}


@router.get(
    "/orders",
    status_code=status.HTTP_200_OK,
)
def get_order(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    """Get an order by its id.

    Args:
        order_id (int): The id of the order.
        db (Session): The database session.

    Returns:
        schemas.OrderResponse: The order.
    """
    user_id = current_user.user_id

    latest_order = (
        db.query(models.Order)
        .filter(models.Order.user_id == user_id)
        .order_by(models.Order.created_at.desc())
        .first()
    )

    if not latest_order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )

    order_items = (
        db.query(models.OrderItem)
        .filter(models.OrderItem.order_id == latest_order.order_id)
        .all()
    )

    order_items_data = []
    for item in order_items:
        order_items_data.append(
            {
                "prod_name": item.prod_name,
                "quantity": item.quantity,
                "total_price": item.total_price,
            }
        )

    order_data = {
        "order_id": latest_order.order_id,
        "user_id": latest_order.user_id,
        "created_at": latest_order.created_at,
        "total_price": latest_order.total_price,
        "address": latest_order.address,
        "payment_method": latest_order.payment_method,
        "order_status": latest_order.order_status,
        "tax": latest_order.tax,
        "discount": latest_order.discount,
        "discount_code": latest_order.discount_code,
        "order_items": order_items_data,
    }

    return order_data
