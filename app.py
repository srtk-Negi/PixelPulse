from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from PixelBackend import models, schemas
from PixelBackend.database import engine, get_db
from sqlalchemy.orm import Session

app = FastAPI()

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


@app.get("/users", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    """Get all users from the database.

    Args:
        db (Session): The database session.

    Returns:
        list[schemas.UserResponse]: A list of all users in the database.
    """
    users = db.query(models.User).all()
    return users


@app.post("/login", status_code=status.HTTP_200_OK, response_model=schemas.UserResponse)
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
        raise HTTPException(status_code=404, detail="User not found")
    else:
        if db_user.password != user.password:
            raise HTTPException(status_code=400, detail="Invalid password")
        else:
            return db_user


@app.post(
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
        raise HTTPException(status_code=400, detail="Email already registered")
    else:
        new_user = models.User(**user.model_dump())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user


@app.delete(
    "/user/delete/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_model=schemas.UserResponse,
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
        return db_user
    else:
        raise HTTPException(status_code=404, detail="User not found")


@app.put(
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
        raise HTTPException(status_code=404, detail="User not found")
    db_user_query.update(user.model_dump(), synchronize_session=False)
    db.commit()

    return db_user_query.first()


@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).all()
    return products


@app.post("/add_product", status_code=status.HTTP_201_CREATED)
def add_product(product: schemas.Product, db: Session = Depends(get_db)):
    new_product = models.Product(**product.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


@app.delete("/delete_product/{prod_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(prod_id: int, db: Session = Depends(get_db)):
    db_product = (
        db.query(models.Product).filter(models.Product.prod_id == prod_id).first()
    )
    if db_product:
        db.delete(db_product)
        db.commit()
        return {"message": "Product deleted"}
    else:
        raise HTTPException(status_code=404, detail="Product not found")


@app.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(models.Category).all()
    return categories


@app.post("/add_category", status_code=status.HTTP_201_CREATED)
def add_category(category: schemas.Category, db: Session = Depends(get_db)):
    new_category = models.Category(**category.model_dump())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


@app.delete("/delete_category/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: int, db: Session = Depends(get_db)):
    db_category = (
        db.query(models.Category)
        .filter(models.Category.category_id == category_id)
        .first()
    )
    if db_category:
        db.delete(db_category)
        db.commit()
        return {"message": "Category deleted"}
    else:
        raise HTTPException(status_code=404, detail="Category not found")


@app.get("/carts")
def get_carts(db: Session = Depends(get_db)):
    carts = db.query(models.Cart).all()
    return carts


@app.post("/add_cart", status_code=status.HTTP_201_CREATED)
def add_cart(cart: schemas.Cart, db: Session = Depends(get_db)):
    new_cart = models.Cart(**cart.model_dump())
    db.add(new_cart)
    db.commit()
    db.refresh(new_cart)
    return new_cart


@app.delete("/delete_cart/{cart_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cart(cart_id: int, db: Session = Depends(get_db)):
    db_cart = db.query(models.Cart).filter(models.Cart.cart_id == cart_id).first()
    if db_cart:
        db.delete(db_cart)
        db.commit()
        return {"message": "Cart deleted"}
    else:
        raise HTTPException(status_code=404, detail="Cart not found")


@app.get("/cart_items")
def get_cart_items(db: Session = Depends(get_db)):
    cart_items = db.query(models.CartItem).all()
    return cart_items


@app.post("/add_cart_item", status_code=status.HTTP_201_CREATED)
def add_cart_item(cart_item: schemas.CartItem, db: Session = Depends(get_db)):
    new_cart_item = models.CartItem(**cart_item.model_dump())
    db.add(new_cart_item)
    db.commit()
    db.refresh(new_cart_item)
    return new_cart_item


@app.delete("/delete_cart_item/{cart_item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cart_item(cart_item_id: int, db: Session = Depends(get_db)):
    db_cart_item = (
        db.query(models.CartItem)
        .filter(models.CartItem.cart_item_id == cart_item_id)
        .first()
    )
    if db_cart_item:
        db.delete(db_cart_item)
        db.commit()
        return {"message": "Cart item deleted"}
    else:
        raise HTTPException(status_code=404, detail="Cart item not found")


@app.get("/orders")
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(models.Order).all()
    return orders


@app.post("/add_order", status_code=status.HTTP_201_CREATED)
def add_order(order: schemas.Order, db: Session = Depends(get_db)):
    new_order = models.Order(**order.model_dump())
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order


@app.delete("/delete_order/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    db_order = db.query(models.Order).filter(models.Order.order_id == order_id).first()
    if db_order:
        db.delete(db_order)
        db.commit()
        return {"message": "Order deleted"}
    else:
        raise HTTPException(status_code=404, detail="Order not found")


@app.get("/order_items")
def get_order_items(db: Session = Depends(get_db)):
    order_items = db.query(models.OrderItem).all()
    return order_items


@app.post("/add_order_item", status_code=status.HTTP_201_CREATED)
def add_order_item(order_item: schemas.OrderItem, db: Session = Depends(get_db)):
    new_order_item = models.OrderItem(**order_item.model_dump())
    db.add(new_order_item)
    db.commit()
    db.refresh(new_order_item)
    return new_order_item


@app.delete(
    "/delete_order_item/{order_item_id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete_order_item(order_item_id: int, db: Session = Depends(get_db)):
    db_order_item = (
        db.query(models.OrderItem)
        .filter(models.OrderItem.order_item_id == order_item_id)
        .first()
    )
    if db_order_item:
        db.delete(db_order_item)
        db.commit()
        return {"message": "Order item deleted"}
    else:
        raise HTTPException(status_code=404, detail="Order item not found")


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
