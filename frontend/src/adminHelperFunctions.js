import axios from "axios";

export const getAllUsers = async (setUsers, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await axios.get("/api/admin/users", {
            headers: headers,
        });
        setUsers(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllOrders = async (setOrders, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await axios.get("/api/admin/orders", {
            headers: headers,
        });
        setOrders(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllProducts = async (setProducts, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await axios.get("/api/admin/products", {
            headers: headers,
        });
        setProducts(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllCategories = async (setCategories, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await axios.get("/api/admin/categories", {
            headers: headers,
        });
        setCategories(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllOrderItems = async (setOrderItems, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await axios.get("/api/admin/order_items", {
            headers: headers,
        });
        setOrderItems(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllCarts = async (setCarts, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await axios.get("/api/admin/carts", {
            headers: headers,
        });
        setCarts(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllCartItems = async (setCartItems, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await axios.get("/api/admin/cart_items", {
            headers: headers,
        });
        setCartItems(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllDiscounts = async (setDiscounts, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await axios.get("/api/admin/discounts", {
            headers: headers,
        });
        setDiscounts(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const deleteUser = async (userId, setUsers, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        await axios.delete(`/api/admin/users/delete/${userId}`, {
            headers: headers,
        });
        getAllUsers(setUsers, token);
    } catch (error) {
        console.error(error);
    }
};

export const deleteProduct = async (productId, setProducts, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        await axios.delete(`/api/admin/products/delete/${productId}`, {
            headers: headers,
        });
        getAllProducts(setProducts, token);
    } catch (error) {
        console.error(error);
    }
};

export const deleteDiscount = async (discountId, setDiscounts, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        await axios.delete(`/api/admin/discounts/delete/${discountId}`, {
            headers: headers,
        });
        getAllDiscounts(setDiscounts, token);
    } catch (error) {
        console.error(error);
    }
};

export const sortOrders = async (sortOption, setOrders, token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    try {
        const response = await axios.get(
            `/api/admin/orders/sorted/${sortOption}`,
            {
                headers: headers,
            }
        );
        setOrders(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const formatLocalISODate = (dateInput) => {
    const date = new Date(dateInput);
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - timezoneOffset)
        .toISOString()
        .slice(0, 10);
    return localISOTime;
};
