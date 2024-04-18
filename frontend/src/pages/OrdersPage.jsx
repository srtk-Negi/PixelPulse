import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const OrderSummary = ({ orderTotal, orderItems }) => {
    return (
        <div className="orderSummary">
            <div className="summaryHeader">Order Summary</div>
            {orderItems.map((name) => (
                <div key={name} className="summaryItem">
                    - {name}
                </div>
            ))}
            <div className="orderTotal">Order Total: ${orderTotal}</div>
        </div>
    );
};

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        try {
            const response = await axios.get("/api/order/orders", {
                headers,
            });
            console.log(response.data);
            setOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="ordersPage">
            {!orders && <LoadingSpinner />}
            {orders && orders.length === 0 && (
                <div className="ordersHeader">No orders placed yet</div>
            )}
            {orders && orders.length > 0 && (
                <>
                    <div className="ordersHeader">
                        <i
                            className="pi pi-check"
                            style={{
                                marginRight: "1rem",
                                fontSize: "3rem",
                            }}
                        ></i>
                        Orders
                    </div>
                    <div className="mainContent">
                        <div className="ordersContainer"></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrdersPage;
