from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from . import schemas, database, models
import os
from sqlalchemy.orm import Session

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = os.getenv("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("JWT_EXPIRES_IN")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict):
    """Create an access token.

    Args:
        data (dict): The data to encode.

    Returns:
        str: The encoded access token.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(token: str, credentials_exception):
    """Verify an access token.

    Args:
        token (str): The token to verify.

    Returns:
        dict: The decoded token.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        user_type = payload.get("user_type")

        if user_id is None:
            raise credentials_exception

        token_data = schemas.TokenData(user_id=user_id, user_type=user_type)
    except JWTError:
        raise credentials_exception
    print(token_data)
    return token_data


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)
):
    """Get the current user.

    Args:
        token (str, optional): The token to verify. Defaults to Depends(oauth2_scheme).

    Returns:
        dict: The current user.
    """
    print("1here")
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_access_token(token, credentials_exception)

    current_user = (
        db.query(models.User).filter(models.User.user_id == token_data.user_id).first()
    )

    if current_user is None:
        raise credentials_exception
    return current_user
