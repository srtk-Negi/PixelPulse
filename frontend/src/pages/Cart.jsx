import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCart = async () => {
            const response = await axios.get("/api/cart/cartItems", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCart(response.data);
            console.log(response.data);
        };
        fetchCart();
    }, []);

    const removeFromCart = async (prod_id) => {
        const response = await fetch(`/api/cart/${prod_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        setCart(data.cart);
        setTotal(data.total);
    };

    return (
        <div className="cart">
            <h1>Cart</h1>
            <div className="cartItems">
                {cart.map((item) => (
                    <div key={item.prod_id} className="cartItem">
                        <div className="cartImg">
                            <img src={item.image_url} alt={item.name} />
                        </div>
                        <div className="cartDetails">
                            <div className="cartName">{item.name}</div>
                            <div className="cartPrice">${item.price}</div>
                            <Button
                                label="Remove"
                                icon="pi pi-trash"
                                className="p-button-raised p-button-rounded"
                                onClick={() => removeFromCart(item.prod_id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="total">
                <h2>Total: ${total}</h2>
            </div>
        </div>
    );
};

export default Cart;
