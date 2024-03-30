import axios from "axios";

export const getAllUsers = async (setUsers) => {
    try {
        const response = await axios.get("/api/admin/users");
        setUsers(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllOrders = async (setOrders) => {
    try {
        const response = await axios.get("/api/admin/orders");
        setOrders(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllProducts = async (setProducts) => {
    try {
        const response = await axios.get("/api/admin/products");
        setProducts(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllCategories = async (setCategories) => {
    try {
        const response = await axios.get("/api/admin/categories");
        setCategories(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllOrderItems = async (setOrderItems) => {
    try {
        const response = await axios.get("/api/admin/order_items");
        setOrderItems(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllCarts = async (setCarts) => {
    try {
        const response = await axios.get("/api/admin/carts");
        setCarts(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const getAllDiscounts = async (setDiscounts) => {
    try {
        const response = await axios.get("/api/admin/discounts");
        setDiscounts(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const deleteUser = async (userId, setUsers) => {
    try {
        await axios.delete(`/api/admin/users/delete/${userId}`);
        getAllUsers(setUsers);
    } catch (error) {
        console.error(error);
    }
};

export const deleteProduct = async (productId, setProducts) => {
    try {
        await axios.delete(`/api/admin/products/delete/${productId}`);
        getAllProducts(setProducts);
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
