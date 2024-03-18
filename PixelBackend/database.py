from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_USER = os.environ.get("DB_USER")
DATABASE_PASSWORD = os.environ.get("DB_PASSWORD")
DATABASE_PORT = os.environ.get("DB_PORT")
DATABASE_HOST = os.environ.get("DB_HOST")
DATABASE_NAME = os.environ.get("DB_NAME")


connnection_string = f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"

engine = create_engine(connnection_string)
Session = sessionmaker(autoflush=False, bind=engine, autocommit=False)
Base = declarative_base()


def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()
