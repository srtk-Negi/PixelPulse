from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, models
from ..database import get_db
from ..utils import hash_password
from ..OAuth import get_current_user

router = APIRouter()


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.UserResponseRegister,
)
def register(user: schemas.User, db: Session = Depends(get_db)):
    """Register a new user.

    Args:
        user (schemas.User): The user to register.
        db (Session): The database session.

    Returns:
        schemas.UserResponse: The user that was registered.
    """
    db_user_query = db.query(models.User).filter(models.User.email == user.email)
    db_user = db_user_query.first()

    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    db_user_query = db.query(models.User).filter(models.User.phone == user.phone)
    db_user = db_user_query.first()

    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number already registered",
        )

    hashed_password = hash_password(user.password)
    user.password = hashed_password

    new_user = models.User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.put(
    "/user/update/{user_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=schemas.UserResponseLogin,
)
def update_user(user_id: int, user: schemas.User, db: Session = Depends(get_db)):
    """Update a user.

    Args:
        user_id (int): The id of the user to update.
        user (schemas.UserUpdate): The new user data.
        db (Session): The database session.

    Returns:
        schemas.UserResponse: The user that was updated.
    """
    db_user_query = db.query(models.User).filter(models.User.user_id == user_id)
    db_user = db_user_query.first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    db_user_query.update(user.model_dump(), synchronize_session=False)
    db.commit()

    return db_user_query.first()


@router.get("/me")
def get_user(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    """Get a user by id.

    Args:
        db (Session): The database session.
        current_user (dict): The current user.

    Returns:
        schemas.UserResponse: The user that was retrieved.
    """
    user_id = current_user.user_id
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return db_user.first_name
