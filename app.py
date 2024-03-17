from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from PixelBackend import models, schemas
from PixelBackend.database import engine, get_db
from sqlalchemy.orm import Session
from PixelBackend.api import adminRoutes, carts, categories, orders, products, users

app = FastAPI()

app.include_router(adminRoutes.router)
app.include_router(carts.router)
app.include_router(categories.router)
app.include_router(orders.router)
app.include_router(products.router)
app.include_router(users.router)

models.Base.metadata.create_all(bind=engine)


origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.post(
    "/cart_item/add",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.CartItemResponse,
)
def add_cart_item(cart_item: schemas.CartItem, db: Session = Depends(get_db)):
    """Add a new cart item to the database.

    Args:
        cart_item (schemas.CartItem): The cart item to add.
        db (Session): The database session.

    Returns:
        schemas.CartItemResponse: The cart item (name of the product) that was added.
    """
    new_cart_item = models.CartItem(**cart_item.model_dump())
    db.add(new_cart_item)
    db.commit()
    db.refresh(new_cart_item)
    return new_cart_item


@app.delete(
    "/cart_item/delete/{cart_item_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_model=schemas.CartItemResponse,
)
def delete_cart_item(cart_item_id: int, db: Session = Depends(get_db)):
    """Delete a cart item from the database.

    Args:
        cart_item_id (int): The id of the cart item to delete.
        db (Session): The database session.

    Returns:
        schemas.CartItemResponse: The cart item (name of the product) that was deleted.
    """
    db_cart_item_query = db.query(models.CartItem).filter(
        models.CartItem.cart_item_id == cart_item_id
    )
    db_cart_item = db_cart_item_query.first()

    if db_cart_item:
        db.delete(db_cart_item)
        db.commit()
        return db_cart_item
    else:
        raise HTTPException(status_code=404, detail="Cart item not found")


@app.get("/discount_codes")
def get_discount_codes(db: Session = Depends(get_db)):
    discount_codes = db.query(models.DiscountCode).all()
    return discount_codes


@app.post("/add_discount_code", status_code=status.HTTP_201_CREATED)
def add_discount_code(
    discount_code: schemas.DiscountCode, db: Session = Depends(get_db)
):
    new_discount_code = models.DiscountCode(**discount_code.model_dump())
    db.add(new_discount_code)
    db.commit()
    db.refresh(new_discount_code)
    return new_discount_code


@app.delete(
    "/delete_discount_code/{discount_code_id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete_discount_code(discount_code_id: int, db: Session = Depends(get_db)):
    db_discount_code = (
        db.query(models.DiscountCode)
        .filter(models.DiscountCode.discount_code_id == discount_code_id)
        .first()
    )
    if db_discount_code:
        db.delete(db_discount_code)
        db.commit()
        return {"message": "Discount code deleted"}
    else:
        raise HTTPException(status_code=404, detail="Discount code not found")


@app.get("/products/{prod_id}")
def get_product(prod_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.prod_id == prod_id).first()
    if product:
        return product
    else:
        raise HTTPException(status_code=404, detail="Product not found")


@app.get("/categories/{category_id}")
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = (
        db.query(models.Category)
        .filter(models.Category.category_id == category_id)
        .first()
    )
    if category:
        return category
    else:
        raise HTTPException(status_code=404, detail="Category not found")


@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if user:
        return user
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.get("/carts/{cart_id}")
def get_cart(cart_id: int, db: Session = Depends(get_db)):
    cart = db.query(models.Cart).filter(models.Cart.cart_id == cart_id).first()
    if cart:
        return cart
    else:
        raise HTTPException(status_code=404, detail="Cart not found")


@app.get("/cart_items/{cart_item_id}")
def get_cart_item(cart_item_id: int, db: Session = Depends(get_db)):
    cart_item = (
        db.query(models.CartItem)
        .filter(models.CartItem.cart_item_id == cart_item_id)
        .first()
    )
    if cart_item:
        return cart_item
    else:
        raise HTTPException(status_code=404, detail="Cart item not found")


@app.get("/orders/{order_id}")
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.order_id == order_id).first()
    if order:
        return order
    else:
        raise HTTPException(status_code=404, detail="Order not found")


@app.get("/order_items/{order_item_id}")
def get_order_item(order_item_id: int, db: Session = Depends(get_db)):
    order_item = (
        db.query(models.OrderItem)
        .filter(models.OrderItem.order_item_id == order_item_id)
        .first()
    )
    if order_item:
        return order_item
    else:
        raise HTTPException(status_code=404, detail="Order item not found")


@app.get("/discount_codes/{discount_code_id}")
def get_discount_code(discount_code_id: int, db: Session = Depends(get_db)):
    discount_code = (
        db.query(models.DiscountCode)
        .filter(models.DiscountCode.discount_code_id == discount_code_id)
        .first()
    )
    if discount_code:
        return discount_code
    else:
        raise HTTPException(status_code=404, detail="Discount code not found")


@app.put("/update_category/{category_id}", status_code=status.HTTP_202_ACCEPTED)
def update_category(
    category_id: int, category: schemas.Category, db: Session = Depends(get_db)
):
    db_category = (
        db.query(models.Category)
        .filter(models.Category.category_id == category_id)
        .first()
    )
    if db_category:
        db_category.name = category.name
        db.commit()
        return db_category
    else:
        raise HTTPException(status_code=404, detail="Category not found")


@app.put("/update_cart/{cart_id}", status_code=status.HTTP_202_ACCEPTED)
def update_cart(cart_id: int, cart: schemas.Cart, db: Session = Depends(get_db)):
    db_cart = db.query(models.Cart).filter(models.Cart.cart_id == cart_id).first()
    if db_cart:
        db_cart.user_id = cart.user_id
        db.commit()
        return db_cart
    else:
        raise HTTPException(status_code=404, detail="Cart not found")


@app.put("/update_cart_item/{cart_item_id}", status_code=status.HTTP_202_ACCEPTED)
def update_cart_item(
    cart_item_id: int, cart_item: schemas.CartItem, db: Session = Depends(get_db)
):
    db_cart_item = (
        db.query(models.CartItem)
        .filter(models.CartItem.cart_item_id == cart_item_id)
        .first()
    )
    if db_cart_item:
        db_cart_item.cart_id = cart_item.cart_id
        db_cart_item.prod_id = cart_item.prod_id
        db_cart_item.quantity = cart_item.quantity
        db_cart_item.total_price = cart_item.total_price
        db.commit()
        return db_cart_item
    else:
        raise HTTPException(status_code=404, detail="Cart item not found")


@app.put("/update_order/{order_id}", status_code=status.HTTP_202_ACCEPTED)
def update_order(order_id: int, order: schemas.Order, db: Session = Depends(get_db)):
    db_order = db.query(models.Order).filter(models.Order.order_id == order_id).first()
    if db_order:
        db_order.user_id = order.user_id
        db_order.total_price = order.total_price
        db_order.address = order.address
        db_order.payment_method = order.payment_method
        db_order.order_status = order.order_status
        db_order.tax = order.tax
        db_order.discount = order.discount
        db_order.discount_code = order.discount_code
        db.commit()
        return db_order
    else:
        raise HTTPException(status_code=404, detail="Order not found")


@app.put("/update_order_item/{order_item_id}", status_code=status.HTTP_202_ACCEPTED)
def update_order_item(
    order_item_id: int, order_item: schemas.OrderItem, db: Session = Depends(get_db)
):
    db_order_item = (
        db.query(models.OrderItem)
        .filter(models.OrderItem.order_item_id == order_item_id)
        .first()
    )
    if db_order_item:
        db_order_item.order_id = order_item.order_id
        db_order_item.prod_id = order_item.prod_id
        db_order_item.quantity = order_item.quantity
        db_order_item.total_price = order_item.total_price
        db.commit()
        return db_order_item
    else:
        raise HTTPException(status_code=404, detail="Order item not found")


@app.put(
    "/update_discount_code/{discount_code_id}", status_code=status.HTTP_202_ACCEPTED
)
def update_discount_code(
    discount_code_id: int,
    discount_code: schemas.DiscountCode,
    db: Session = Depends(get_db),
):
    db_discount_code = (
        db.query(models.DiscountCode)
        .filter(models.DiscountCode.discount_code_id == discount_code_id)
        .first()
    )
    if db_discount_code:
        db_discount_code.code = discount_code.code
        db_discount_code.discount = discount_code.discount
        db.commit()
        return db_discount_code
    else:
        raise HTTPException(status_code=404, detail="Discount code not found")
