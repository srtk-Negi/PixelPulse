import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatLocalISODate } from "../adminHelperFunctions";

const OrderSummary = ({ orderItems }) => {
    return (
        <div className="orderSummary">
            {orderItems.map((item) => (
                <div className="orderItem">- {item.prod_name}</div>
            ))}
        </div>
    );
};

const OrdersPage = () => {
    const [orders, setOrders] = useState();

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
            {orders && (
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
                        <div className="ordersContainer">
                            <div className="orderDetails">
                                <div className="orderDetailsHeader">
                                    Order Details
                                </div>
                                <div>Order ID - {orders.order_id}</div>
                                <div>
                                    Placed On -{" "}
                                    {formatLocalISODate(orders.created_at)}
                                </div>
                                {orders.discount != 0 && (
                                    <div>Discount - {orders.discount}%</div>
                                )}
                                {orders.discount_code && (
                                    <div>
                                        Discount Code - {orders.discount_code}
                                    </div>
                                )}
                                <div>Tax - ${orders.tax}</div>
                                <div>Order Total - ${orders.total_price}</div>
                            </div>
                            <div className="orderItems">
                                <div className="orderItemsHeader">
                                    Order Items
                                </div>
                                <OrderSummary orderItems={orders.order_items} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrdersPage;
