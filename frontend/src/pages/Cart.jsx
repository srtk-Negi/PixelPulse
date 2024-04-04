import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const removeFromCart = (prod_id) => {
    console.log(prod_id);
};

const ItemCard = ({ item }) => {
    const header = <img alt="Card" src={item.image_url} />;
    const footer = (
        <>
            <Button label={item.price} />
            <Button
                label="Remove from Cart"
                icon="pi pi-trash"
                className="p-button-raised p-button-rounded p-button-danger"
                onClick={() => removeFromCart(item.prod_id)}
            />
        </>
    );

    return (
        <div className="cartItem">
            <Card
                title={item.prod_name}
                subTitle={item.category}
                style={{ width: "25rem", height: "25rem" }}
                header={header}
                footer={footer}
            >
                {item.description}
            </Card>
        </div>
    );
};

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const token = localStorage.getItem("token");
    const prices = [];

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

    return (
        <div className="cart">
            <h1>
                <i
                    className="pi pi-shopping-cart"
                    style={{ marginRight: "1rem", fontSize: "3rem" }}
                />
                Cart
            </h1>
            <div className="cartItems">
                {cart.map((item) => {
                    return <ItemCard item={item} key={item.prod_id} />;
                })}
            </div>
            <div className="total">
                <h2>Total: ${total}</h2>
            </div>
        </div>
    );
};

export default Cart;
