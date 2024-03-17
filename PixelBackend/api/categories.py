from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from PixelBackend import schemas, models
from PixelBackend.database import get_db

router = APIRouter()


@router.post(
    "/category/add",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.CategoryResponse,
)
def add_category(category: schemas.Category, db: Session = Depends(get_db)):
    """Add a new category to the database.

    Args:
        category (schemas.Category): The category to add.
        db (Session): The database session.

    Returns:
        schemas.CategoryResponse: The category that was added.
    """
    new_category = models.Category(**category.model_dump())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


@router.delete(
    "/category/delete/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_model=schemas.CategoryResponse,
)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    """Delete a category from the database.

    Args:
        category_id (int): The id of the category to delete.
        db (Session): The database session.

    Returns:
        schemas.CategoryResponse: The category that was deleted.
    """
    db_category_query = db.query(models.Category).filter(
        models.Category.category_id == category_id
    )
    db_category = db_category_query.first()

    if db_category:
        db.delete(db_category)
        db.commit()
        return db_category
    else:
        raise HTTPException(status_code=404, detail="Category not found")
