// react imports
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Component imports
import LoadingSpinner from "../components/LoadingSpinner";
import UsersDashboard from "../components/UsersDashboard";
import OrdersDashboard from "../components/OrdersDashboard";
import ProductsDashboard from "../components/ProductsDashboard";
import UserUpdateForm from "../components/AdminForms/UserUpdateForm";
import ProductUpdateForm from "../components/AdminForms/ProductUpdateForm";
import AddProductForm from "../components/AdminForms/AddProductForm";

// PrimeReact imports
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog";

const AdminHomePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState(null);
    const [orders, setOrders] = React.useState(null);
    const [products, setProducts] = React.useState(null);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [showUserUpdateForm, setShowUserUpdateForm] = React.useState(false);
    const [showUserDeleteDialog, setShowUserDeleteDialog] =
        React.useState(false);
    const [showProductUpdateForm, setShowProductUpdateForm] =
        React.useState(false);
    const [showProductDeleteDialog, setShowProductDeleteDialog] =
        React.useState(false);
    const [showAddProductForm, setShowAddProductForm] = React.useState(false);

    const getAllUsers = async () => {
        try {
            const response = await axios.get("/api/admin/users");
            closeAllTables("users");
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllOrders = async () => {
        try {
            const response = await axios.get("/api/admin/orders");
            closeAllTables("orders");
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllProducts = async () => {
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

    useEffect(() => {
        const checkUser = async () => {
            try {
                await axios.get("/api/auth/userType");
            } catch (error) {
                navigate("/unauthorized");
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    return (
        <div id="adminPageContainer">
            <div className="controlButtons">
                <Button label="Get All Users" onClick={() => getAllUsers()} />
                <Button label="Get All Orders" onClick={() => getAllOrders()} />
                <Button
                    label="Get All Products"
                    onClick={() => getAllProducts()}
                />
            </div>
            <h1>Admin Home Page</h1>
            {loading && <LoadingSpinner />}
            {/* RENDER THE USERS TABLE */}
            {users && (
                <UsersDashboard
                    users={users}
                    setSelectedUser={setSelectedUser}
                    setShowUserUpdateForm={setShowUserUpdateForm}
                    setShowUserDeleteDialog={setShowUserDeleteDialog}
                />
            )}
            {/* RENDER THE ORDERS TABLE */}
            {orders && <OrdersDashboard orders={orders} />}

            {/* RENDER THE PRODUCTS TABLE */}
            {products && (
                <>
                    <ProductsDashboard
                        products={products}
                        setSelectedProduct={setSelectedProduct}
                        setShowProductUpdateForm={setShowProductUpdateForm}
                        setShowProductDeleteDialog={setShowProductDeleteDialog}
                    />
                    <Button
                        label="Add Product"
                        onClick={() => setShowAddProductForm(true)}
                    />
                </>
            )}

            {/* RENDER THE ADD PRODUCT FORM */}
            <Dialog
                header="Add Product"
                visible={showAddProductForm}
                style={{ width: "50vw" }}
                onHide={() => {
                    setShowAddProductForm(false);
                    getAllProducts();
                }}
            >
                <AddProductForm
                    setShowAddProductForm={setShowAddProductForm}
                    getAllProducts={getAllProducts}
                />
            </Dialog>

            {/* RENDER THE USER UPDATE FORM */}
            <Dialog
                header="Update User"
                visible={showUserUpdateForm}
                style={{ width: "50vw" }}
                onHide={() => setShowUserUpdateForm(false)}
            >
                {selectedUser && (
                    <UserUpdateForm
                        user={selectedUser}
                        setShowUserUpdateForm={setShowUserUpdateForm}
                        getAllUsers={getAllUsers}
                    />
                )}
            </Dialog>

            {/* RENDER THE DELETE USER DIALOG */}
            <ConfirmDialog
                header="Delete User"
                visible={showUserDeleteDialog}
                onHide={() => setShowUserDeleteDialog(false)}
                message="Are you sure you want to delete this user?"
                accept={() => {
                    setShowUserDeleteDialog(false);
                    deleteUser(selectedUser.user_id);
                }}
            ></ConfirmDialog>

            {/* RENDER THE PRODUCT UPDATE FORM */}
            <Dialog
                header="Update Product"
                visible={showProductUpdateForm}
                style={{ width: "50vw" }}
                onHide={() => setShowProductUpdateForm(false)}
            >
                {selectedProduct && (
                    <ProductUpdateForm
                        product={selectedProduct}
                        setShowProductUpdateForm={setShowProductUpdateForm}
                        getAllProducts={getAllProducts}
                    />
                )}
            </Dialog>

            {/* RENDER THE DELETE PRODUCT DIALOG */}
            <ConfirmDialog
                header="Delete Product"
                visible={showProductDeleteDialog}
                onHide={() => setShowProductDeleteDialog(false)}
                message="Are you sure you want to delete this product?"
                accept={() => {
                    deleteProduct(selectedProduct.prod_id);
                    setShowProductDeleteDialog(false);
                }}
            ></ConfirmDialog>
        </div>
    );
};

export default AdminHomePage;
