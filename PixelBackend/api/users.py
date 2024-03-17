from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from .. import schemas, models
from ..database import get_db
from ..utils import hash_password

router = APIRouter()


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.UserResponse,
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


@router.get("/user/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get a user by id.

    Args:
        user_id (int): The id of the user to get.
        db (Session): The database session.

    Returns:
        schemas.UserResponse: The user with the given id.
    """
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user:
        return user
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id={user_id} not found",
        )


@router.delete(
    "/user/delete/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Delete a user.

    Args:
        user_id (int): The id of the user to delete.
        db (Session): The database session.

    Returns:
        schemas.UserResponse: The user that was deleted.
    """
    db_user_query = db.query(models.User).filter(models.User.user_id == user_id)
    db_user = db_user_query.first()

    if db_user:
        db.delete(db_user)
        db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )


@router.put(
    "/user/update/{user_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=schemas.UserResponse,
)
def update_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
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
