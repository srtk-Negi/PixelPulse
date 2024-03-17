from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from PixelBackend import models, schemas
from PixelBackend.database import get_db

router = APIRouter()


@router.post(
    "/login", status_code=status.HTTP_200_OK, response_model=schemas.UserResponse
)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    """Login a user.

    Args:
        user (schemas.UserLogin): The user to login.
        db (Session): The database session.

    Returns:
        schemas.UserResponse: The user that was logged in.
    """
    print(user)
    db_user_query = db.query(models.User).filter(models.User.email == user.email)
    db_user = db_user_query.first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        if db_user.password != user.password:
            raise HTTPException(status_code=400, detail="Invalid password")
        else:
            return db_user
