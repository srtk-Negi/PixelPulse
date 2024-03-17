from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from PixelBackend import schemas, models
from PixelBackend.database import get_db

router = APIRouter()


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
    """
    new_product = models.Product(**product.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


@router.delete(
    "/product/delete/{prod_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_model=schemas.ProductResponse,
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
        return db_product
    else:
        raise HTTPException(status_code=404, detail="Product not found")


@router.put("/update_product/{prod_id}", status_code=status.HTTP_202_ACCEPTED)
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
