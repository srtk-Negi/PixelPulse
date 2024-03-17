from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from PixelBackend import schemas, models
from PixelBackend.database import get_db

router = APIRouter()


@router.post(
    "/order/add",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.OrderResponse,
)
def add_order(order: schemas.Order, db: Session = Depends(get_db)):
    """Add a new order to the database.

    Args:
        order (schemas.Order): The order to add.
        db (Session): The database session.

    Returns:
        schemas.OrderResponse: The order id of the order that was added.
    """
    new_order = models.Order(**order.model_dump())
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order


@router.delete(
    "/order/delete/{order_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_model=schemas.OrderResponse,
)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    """Delete an order from the database.

    Args:
        order_id (int): The id of the order to delete.
        db (Session): The database session.

    Returns:
        schemas.OrderResponse: The order id of the order that was deleted.
    """
    db_order_query = db.query(models.Order).filter(models.Order.order_id == order_id)
    db_order = db_order_query.first()

    if db_order:
        db.delete(db_order)
        db.commit()
        return db_order
    else:
        raise HTTPException(status_code=404, detail="Order not found")


@router.post("/add_order_item", status_code=status.HTTP_201_CREATED)
def add_order_item(order_item: schemas.OrderItem, db: Session = Depends(get_db)):
    new_order_item = models.OrderItem(**order_item.model_dump())
    db.add(new_order_item)
    db.commit()
    db.refresh(new_order_item)
    return new_order_item


@router.delete(
    "/delete_order_item/{order_item_id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete_order_item(order_item_id: int, db: Session = Depends(get_db)):
    db_order_item = (
        db.query(models.OrderItem)
        .filter(models.OrderItem.order_item_id == order_item_id)
        .first()
    )
    if db_order_item:
        db.delete(db_order_item)
        db.commit()
        return {"message": "Order item deleted"}
    else:
        raise HTTPException(status_code=404, detail="Order item not found")
