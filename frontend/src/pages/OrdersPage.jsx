import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatLocalISODate } from "../adminHelperFunctions";

const OrderSummary = ({ orderItems }) => {
    return (
        <div className="orderSummary">
            {orderItems.map((item, index) => (
                <div className="orderItem" key={index}>
                    {index + 1}. {item.prod_name} x {item.quantity} - $
                    {item.total_price}
                </div>
            ))}
        </div>
    );
};

const OrdersPage = () => {
    const [order, setOrder] = useState();
    const [orderItems, setOrderItems] = useState();

    const fetchOrders = async () => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        try {
            const response = await axios.get("/api/order/orders", {
                headers,
            });
            setOrder(response.data);
            setOrderItems(response.data.order_items);
        } catch (error) {
            if (error.response.data.detail === "Order not found") {
                setOrder([]);
                setOrderItems([]);
            }
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="ordersPage">
            {!order && <LoadingSpinner />}
            {orderItems && orderItems.length == 0 && (
                <div className="ordersHeader">No orders placed yet</div>
            )}
            {orderItems && orderItems.length > 0 && (
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
                                <div>
                                    <div>Order ID - {order.order_id}</div>
                                    <div>
                                        Placed On -{" "}
                                        {formatLocalISODate(order.created_at)}
                                    </div>
                                    {order.address && (
                                        <div>
                                            Shipping Address - {order.address}
                                        </div>
                                    )}
                                    <div>
                                        Order Status - {order.order_status}
                                    </div>
                                    {order.discount != 0 && (
                                        <div>Discount - {order.discount}%</div>
                                    )}
                                    {order.discount_code && (
                                        <div>
                                            Discount Code -{" "}
                                            {order.discount_code}
                                        </div>
                                    )}
                                    <div>Tax - ${order.tax}</div>
                                    <div>
                                        Order Total - ${order.total_price}
                                    </div>
                                </div>
                            </div>
                            <div className="orderItems">
                                <div className="orderItemsHeader">
                                    Order Items
                                </div>
                                <OrderSummary orderItems={order.order_items} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrdersPage;
