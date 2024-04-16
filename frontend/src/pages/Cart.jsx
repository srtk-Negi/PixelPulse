import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import LoadingSpinner from "../components/LoadingSpinner";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import CheckoutDialog from "../components/CheckoutDialog";
import { Toast } from "primereact/toast";

const placeOrder = async (
    cart,
    taxAmount,
    orderTotal,
    discount,
    discountCode,
    address
) => {
    const dataToSend = {
        address: address,
        cart: cart,
        discount: discount,
        discountCode: discountCode,
        orderTotal: orderTotal,
        order_status: "Placed",
        payment_method: "Credit Card",
        taxAmount: taxAmount,
    };
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    };
    try {
        const { data } = await axios.post("/api/order/add", dataToSend, {
            headers: headers,
        });
    } catch (error) {
        throw error;
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

const ItemCard = ({ item, setShowRemoveProductDialog, setSelectedItem }) => {
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
                onClick={() => {
                    setSelectedItem(item);
                    setShowRemoveProductDialog(true);
                }}
            />
        </div>
    );

    return (
        <div className="cartItem">
            {image}
            <div className="body">
                <div className="prodName">{item.prod_name}</div>
                <div className="category">{item.category}</div>
                {item.description}
                {footer}
            </div>
        </div>
    );
};

const CartSummary = ({ cartTotal, prodNames, setShowCheckoutDialog }) => {
    return (
        <div className="cartSummary">
            <div className="summaryHeader">Summary</div>
            <ul>
                {prodNames.map((name) => (
                    <li key={name} className="summaryItem">
                        - {name}
                    </li>
                ))}
            </ul>
            <div className="cartTotal">Cart Total: ${cartTotal}</div>
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
    const [cartTotal, setCartTotal] = useState(0);
    const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
    const [showRemoveProductDialog, setShowRemoveProductDialog] =
        useState(false);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    const toast = useRef(null);
    const token = localStorage.getItem("token");
    const prices = [];
    const prodNames = [];

    const showOrderPlaced = () => {
        toast.current.show({
            severity: "success",
            summary: "Order Placed",
            detail: "Your order has been placed successfully",
            life: 3000,
        });
    };

    const handlePlaceOrder = async (
        taxAmount,
        orderTotal,
        discount,
        discountCode,
        address
    ) => {
        try {
            const response = await placeOrder(
                cart,
                taxAmount,
                orderTotal,
                discount,
                discountCode,
                address
            );
            axios.delete("/api/cart/carts", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCart([]);
            showOrderPlaced();
        } catch (error) {
            console.error(error);
        }
    };

    const getCartTotal = () => {
        let sum = 0;
        for (let i = 0; i < prices.length; i++) {
            sum += prices[i];
        }
        setCartTotal(sum);
    };

    const fetchCart = async () => {
        try {
            const response = await axios.get("/api/cart/cartItems", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCart(response.data);
        } catch (error) {
            if (error.response.data.detail === "Cart not found for the user.") {
                setCart([]);
            }
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        getCartTotal();
    }, [cart]);

    return (
        <div className="cart">
            <Toast ref={toast} position="center" />
            {!cart && <LoadingSpinner />}
            {cart && cart.length === 0 && (
                <div className="cartHeader">Your cart is empty</div>
            )}
            {cart && cart.length > 0 && (
                <>
                    <div className="cartHeader">
                        <i
                            className="pi pi-shopping-cart"
                            style={{
                                marginRight: "1rem",
                                fontSize: "3rem",
                            }}
                        />
                        Cart
                    </div>
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
                                        setSelectedItem={setSelectedItem}
                                    />
                                );
                            })}
                        </div>
                        <div className="cartSummaryContainer">
                            <CartSummary
                                cartTotal={cartTotal}
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
                                removeFromCart(
                                    selectedItem.cart_item_id,
                                    fetchCart
                                );
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
                            className="checkDiag"
                        >
                            <CheckoutDialog
                                setShowCheckoutDialog={setShowCheckoutDialog}
                                cartTotal={cartTotal}
                                setCartTotal={setCartTotal}
                                handlePlaceOrder={handlePlaceOrder}
                                discountApplied={discountApplied}
                                setDiscountApplied={setDiscountApplied}
                            />
                        </Dialog>
                    }
                </>
            )}
        </div>
    );
};

export default Cart;
