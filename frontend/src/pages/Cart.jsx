import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import LoadingSpinner from "../components/LoadingSpinner";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import CheckoutDialog from "../components/CheckoutDialog";

const placeOrder = async (cart) => {
    console.log(cart);
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };
    try {
        const { data } = await axios.post(
            "/api/order/add",
            { cart },
            { headers: headers }
        );
    } catch (error) {
        return error.response.data.detail;
    }
};

const removeFromCart = async (cart_item_id, fetchCart) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
        await axios.delete(`/api/cart/carts/${cart_item_id}`, { headers });
    } catch (error) {
        console.error(error);
    }
    fetchCart();
};

const ItemCard = ({ item, setShowRemoveProductDialog }) => {
    const image = (
        <div className="imageContainer">
            <img alt="Card" src={item.image_url} />
        </div>
    );
    const footer = (
        <div className="footer">
            <h3>${item.price}</h3>
            <Button
                icon="pi pi-trash"
                className="p-button-raised p-button-rounded p-button-danger"
                onClick={() => setShowRemoveProductDialog(true)}
            />
        </div>
    );

    return (
        <div className="cartItem">
            {image}
            <div className="body">
                <h2>{item.prod_name}</h2>
                <div className="category">{item.category}</div>
                {item.description}
                {footer}
            </div>
        </div>
    );
};

const CartSummary = ({ total, prodNames, setShowCheckoutDialog }) => {
    return (
        <div className="cartSummary">
            <h2>Summary</h2>
            <ul>
                {prodNames.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
            <h3>Total: ${total}</h3>
            <Button
                label="Proceed to Checkout"
                icon="pi pi-shopping-cart"
                className="p-button-raised p-button-rounded p-button-success"
                onClick={() => setShowCheckoutDialog(true)}
            />
        </div>
    );
};

const Cart = () => {
    const [cart, setCart] = useState();
    const [total, setTotal] = useState(0);
    const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
    const [showRemoveProductDialog, setShowRemoveProductDialog] =
        useState(false);
    const token = localStorage.getItem("token");
    const prices = [];
    const prodNames = [];

    const handlePlaceOrder = async () => {
        const response = await placeOrder(cart);
        if (response === "Order placed successfully") {
            fetchCart();
        }
    };

    const getCartTotal = () => {
        let sum = 0;
        for (let i = 0; i < prices.length; i++) {
            sum += prices[i];
        }
        setTotal(sum);
    };

    const fetchCart = async () => {
        const response = await axios.get("/api/cart/cartItems", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setCart(response.data);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        getCartTotal();
    }, [cart]);

    return (
        <div className="cart">
            {!cart && <LoadingSpinner />}
            {cart && cart.length === 0 && <h1>Your cart is empty</h1>}
            {cart && cart.length > 0 && (
                <>
                    <h1>
                        <i
                            className="pi pi-shopping-cart"
                            style={{
                                marginRight: "1rem",
                                fontSize: "3rem",
                            }}
                        />
                        Cart
                    </h1>
                    <div className="mainContent">
                        <div className="cartItemsContainer">
                            {cart.map((item) => {
                                prices.push(item.price);
                                prodNames.push(item.prod_name);
                                return (
                                    <ItemCard
                                        item={item}
                                        key={item.prod_id}
                                        setShowRemoveProductDialog={
                                            setShowRemoveProductDialog
                                        }
                                    />
                                );
                            })}
                        </div>
                        <div className="cartSummaryContainer">
                            <CartSummary
                                total={total}
                                prodNames={prodNames}
                                setShowCheckoutDialog={setShowCheckoutDialog}
                            />
                        </div>
                    </div>
                    {
                        <ConfirmDialog
                            header="Remove Product"
                            visible={showRemoveProductDialog}
                            onHide={() => setShowRemoveProductDialog(false)}
                            message="Are you sure you want to remove this product from your cart?"
                            icon="pi pi-exclamation-triangle"
                            acceptClassName="p-button-danger"
                            accept={() => {
                                removeFromCart(cart[0].cart_item_id, fetchCart);
                                setShowRemoveProductDialog(false);
                            }}
                            reject={() => setShowRemoveProductDialog(false)}
                        />
                    }
                    {
                        <Dialog
                            header="Checkout"
                            visible={showCheckoutDialog}
                            onHide={() => setShowCheckoutDialog(false)}
                            style={{
                                width: "50rem",
                                height: "40rem",
                                maxHeight: "40rem",
                                maxWidth: "50rem",
                            }}
                        >
                            <CheckoutDialog
                                setShowCheckoutDialog={setShowCheckoutDialog}
                                cartTotal={total}
                                setTotal={setTotal}
                                handlePlaceOrder={handlePlaceOrder}
                            />
                        </Dialog>
                    }
                </>
            )}
        </div>
    );
};

export default Cart;
