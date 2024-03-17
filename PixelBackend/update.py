from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from PixelBackend import schemas, models
from PixelBackend.database import get_db

app = APIRouter()


@app.put("/update_product/{prod_id}", status_code=status.HTTP_202_ACCEPTED)
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
