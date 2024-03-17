from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from PixelBackend import models, schemas
from PixelBackend.database import get_db
from .utils import verify_password
from .OAuth import create_access_token

router = APIRouter()


@router.post(
    "/login", status_code=status.HTTP_200_OK, response_model=schemas.UserResponseLogin
)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    """Login a user.

    Args:
        user (schemas.UserLogin): The user to login.
        db (Session): The database session.

    Returns:
        schemas.UserResponse: The user that was logged in.
    """
    db_user_query = db.query(models.User).filter(models.User.email == user.email)
    db_user = db_user_query.first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid password"
        )

    access_token = create_access_token(
        data={"user_id": db_user.user_id, "user_type": db_user.user_type}
    )

    user_data_response = schemas.UserResponseLogin(
        user_id=db_user.user_id,
        first_name=db_user.first_name,
        user_type=db_user.user_type,
        access_token=access_token,
        token_type="bearer",
    )

    return user_data_response
