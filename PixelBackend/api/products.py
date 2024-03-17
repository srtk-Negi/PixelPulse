from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from PixelBackend import schemas, models
from PixelBackend.database import get_db

router = APIRouter()


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
