from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from PixelBackend import models, schemas
from PixelBackend.database import get_db
from .utils import verify_password
from .OAuth import create_access_token, get_current_user

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
        access_token=access_token,
        token_type="bearer",
    )

    return user_data_response


@router.get(
    "/userType",
    status_code=status.HTTP_201_CREATED,
)
def get_user_type(
    db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    """Get the user type of a user.

    Args:
        user_id (int): The user id.
        db (Session): The database session.

    Returns:
        schemas.UserResponseRegister: The user type of the user.
    """
    if current_user.user_type == "admin":
        return {"user_type": "admin"}
    else:
        return {"user_type": "user"}
