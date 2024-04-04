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
            <h3>${item.price}</h3>
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
                style={{
                    width: "25rem",
                    height: "32rem",
                    borderRadius: "2rem",
                    margin: "1rem",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                }}
                header={header}
                footer={footer}
            >
                {item.description}
            </Card>
        </div>
    );
};

const CartSummary = ({ total }) => {
    return (
        <Card className="cartSummary">
            <h3>Total: ${total}</h3>
            <Button
                label="Proceed to Checkout"
                icon="pi pi-shopping-cart"
                className="p-button-raised p-button-rounded p-button-success"
            />
        </Card>
    );
};

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const token = localStorage.getItem("token");
    const prices = [];

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
                <div className="cartItems">
                    {cart.map((item) => {
                        prices.push(item.price);
                        return <ItemCard item={item} key={item.prod_id} />;
                    })}
                </div>
                <CartSummary total={total} />
            </div>
        </div>
    );
};

export default Cart;
