from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from PixelBackend import schemas, models
from PixelBackend.database import get_db
from ..OAuth import get_current_user
from datetime import datetime

router = APIRouter()


@router.post(
    "/check",
    response_model=schemas.DiscounCodeUserResponse | dict,
)
async def check_discount_code(
    request: Request,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Check if a discount code is valid.

    Args:
        discount_code (schemas.DiscountCode): The discount code to check.
        db (Session): The database session.
        current_user: The current user.

    Returns:
        schemas.DiscounCodeUserResponse: The discount amount.
    """
    body = await request.json()
    code = body.get("code")

    discount = db.query(models.DiscountCode).filter_by(code=code).first()

    if not discount:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Discount code not found.",
        )

    if not discount.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Discount code is not active.",
        )

    if discount.expiration_date < datetime.now():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Discount code has expired.",
        )

    return schemas.DiscounCodeUserResponse(discount=discount.discount)
