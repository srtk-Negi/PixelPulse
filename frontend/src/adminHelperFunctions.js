const getAllUsers = async (setUsers, setLoading) => {
    try {
        const response = await axios.get("/api/admin/users");
        closeAllTables("users");
        setUsers(response.data);
        setLoading(false);
    } catch (error) {
        console.error(error);
    }
};

const getAllOrders = async (setOrders, setLoading) => {
    try {
        const response = await axios.get("/api/admin/orders");
        closeAllTables("orders");
        setOrders(response.data);
        setLoading(false);
    } catch (error) {
        console.error(error);
    }
};

const getAllProducts = async (setProducts, setLoading) => {
    try {
        const response = await axios.get("/api/admin/products");
        closeAllTables("products");
        setProducts(response.data);
        setLoading(false);
    } catch (error) {
        console.error(error);
    }
};

const deleteUser = async (userId) => {
    try {
        await axios.delete(`/api/admin/users/delete/${userId}`);
        getAllUsers();
    } catch (error) {
        console.error(error);
    }
};

const closeAllTables = (currentTable) => {
    if (currentTable === "users") {
        setOrders(null);
        setProducts(null);
    } else if (currentTable === "orders") {
        setUsers(null);
        setProducts(null);
    } else if (currentTable === "products") {
        setUsers(null);
        setOrders(null);
    }
};

const deleteProduct = async (productId) => {
    try {
        await axios.delete(`/api/admin/products/delete/${productId}`);
        getAllProducts();
    } catch (error) {
        console.error(error);
    }
};
