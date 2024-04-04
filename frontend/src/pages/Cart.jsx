import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import LoadingSpinner from "../components/LoadingSpinner";

const removeFromCart = (prod_id) => {
    console.log(prod_id);
};

const ItemCard = ({ item }) => {
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
                onClick={() => removeFromCart(item.prod_id)}
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

const CartSummary = ({ total, prodNames }) => {
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
            />
        </div>
    );
};

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const token = localStorage.getItem("token");
    const prices = [];
    const prodNames = [];

    const getCartTotal = () => {
        let sum = 0;
        for (let i = 0; i < prices.length; i++) {
            sum += prices[i];
        }
        setTotal(sum);
    };

    useEffect(() => {
        const fetchCart = async () => {
            const response = await axios.get("/api/cart/cartItems", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCart(response.data);
        };
        fetchCart();
    }, []);

    useEffect(() => {
        getCartTotal();
    }, [cart]);

    return (
        <div className="cart">
            {cart.length == 0 && <LoadingSpinner />}
            {cart.length > 0 && (
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
                                    <ItemCard item={item} key={item.prod_id} />
                                );
                            })}
                        </div>
                        <div className="cartSummaryContainer">
                            <CartSummary total={total} prodNames={prodNames} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
