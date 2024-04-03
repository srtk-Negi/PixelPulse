import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const removeFromCart = (prod_id) => {
    console.log(prod_id);
};

const ItemCard = ({ item }) => {
    const header = (
        <div className="prodImg">
            <img
                alt="Card"
                src={item.image_url}
                onError={(e) =>
                    (e.target.src =
                        "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                }
            />
        </div>
    );
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
                style={{ width: "25rem" }}
                footer={footer}
                header={header}
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
            <h1>Cart</h1>
            <div className="cartItems">
                {cart.map((item) => (
                    <ItemCard item={item} key={item.prod_id} />
                ))}
            </div>
            <div className="total">
                <h2>Total: ${total}</h2>
            </div>
        </div>
    );
};

export default Cart;
