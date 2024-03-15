from .database import Base
from sqlalchemy import Column, String

class User(Base):
    __tablename__ = "Users"

    email = Column(String, unique=True, index=True, primary_key=True)
    password = Column(String)



