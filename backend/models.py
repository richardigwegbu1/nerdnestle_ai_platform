from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from passlib.hash import bcrypt

Base = declarative_base()


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    commission_pct = Column(Integer, nullable=False, default=0)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=True)
    code = Column(String, nullable=True)  # magic login code
    plan = Column(String, nullable=True)  # "basic", "pro", "lifetime" etc.

    def set_password(self, password: str) -> None:
        self.password_hash = bcrypt.hash(password)

    def verify_password(self, password: str) -> bool:
        if not self.password_hash:
            return False
        return bcrypt.verify(password, self.password_hash)

