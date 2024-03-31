// react imports
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Component imports
import UsersDashboard from "../components/UsersDashboard";
import OrdersDashboard from "../components/OrdersDashboard";
import ProductsDashboard from "../components/ProductsDashboard";
import UserUpdateForm from "../components/AdminForms/UserUpdateForm";
import ProductUpdateForm from "../components/AdminForms/ProductUpdateForm";
import AddProductForm from "../components/AdminForms/AddProductForm";
import CategoriesDashboard from "../components/CategoriesDashboard";
import OrderItemsDashboard from "../components/OrderItemsDashboard";
import CartsDashboard from "../components/CartsDashboard";
import DiscountsDashboard from "../components/DiscountsDashboard";
import AddDiscountForm from "../components/AdminForms/AddDiscountForm";
import CartItemsDashboard from "../components/CartItemsDashboard";

// PrimeReact imports
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog";

// Helper function imports
import * as hf from "../adminHelperFunctions";

const AdminHomePage = () => {
    const navigate = useNavigate();
    const [pageHeader, setPageHeader] = React.useState("Admin Home Page");

    // State variables for data
    const [users, setUsers] = React.useState(null);
    const [orders, setOrders] = React.useState(null);
    const [products, setProducts] = React.useState(null);
    const [categories, setCategories] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState(null);
    const [carts, setCarts] = React.useState(null);
    const [discounts, setDiscounts] = React.useState(null);
    const [cartItems, setCartItems] = React.useState(null); 

    // State variables for selected items
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [selectedDiscount, setSelectedDiscount] = React.useState(null);

    // State variables for showing forms and dialogs
    const [showUserUpdateForm, setShowUserUpdateForm] = React.useState(false);
    const [showUserDeleteDialog, setShowUserDeleteDialog] =
        React.useState(false);
    const [showProductUpdateForm, setShowProductUpdateForm] =
        React.useState(false);
    const [showProductDeleteDialog, setShowProductDeleteDialog] =
        React.useState(false);
    const [showAddProductForm, setShowAddProductForm] = React.useState(false);
    const [showAddDiscountForm, setShowAddDiscountForm] = React.useState(false);
    const [showDiscountDeleteDialog, setShowDiscountDeleteDialog] =
        React.useState(false);

    const closeAllTables = (currentTable) => {
        const allTables = {
            users: setUsers,
            orders: setOrders,
            products: setProducts,
            categories: setCategories,
            orderItems: setOrderItems,
            carts: setCarts,
            discounts: setDiscounts,
        };

        for (const table in allTables) {
            if (table !== currentTable) {
                allTables[table](null);
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);

    return (
        <div id="adminPageContainer">
            <h1>{pageHeader}</h1>
            <div className="controlButtons">
                <Button
                    label="Get All Users"
                    onClick={() => {
                        closeAllTables("users");
                        setPageHeader("All Users");
                        hf.getAllUsers(setUsers);
                    }}
                />
                <Button
                    label="Get All Orders"
                    onClick={() => {
                        closeAllTables("orders");
                        setPageHeader("All Orders");
                        hf.getAllOrders(setOrders);
                    }}
                />
                <Button
                    label="Get All Products"
                    onClick={() => {
                        closeAllTables("products");
                        setPageHeader("All Products");
                        hf.getAllProducts(setProducts);
                    }}
                />
                <Button
                    label="Get All Categories"
                    onClick={() => {
                        closeAllTables("categories");
                        setPageHeader("All Categories");
                        hf.getAllCategories(setCategories);
                    }}
                />
                <Button
                    label="Get All Order Items"
                    onClick={() => {
                        closeAllTables("orderItems");
                        setPageHeader("All Order Items");
                        hf.getAllOrderItems(setOrderItems);
                    }}
                />
                <Button
                    label="Get All Carts"
                    onClick={() => {
                        closeAllTables("carts");
                        setPageHeader("All Carts");
                        hf.getAllCarts(setCarts);
                    }}
                />
                <Button
                    label="Get All Discounts"
                    onClick={() => {
                        closeAllTables("discounts");
                        setPageHeader("All Discounts");
                        hf.getAllDiscounts(setDiscounts);
                    }}
                />
                <Button
                    label="Get All Cart Items"
                    onClick={() => {
                        closeAllTables("cartItems");
                        setPageHeader("All Cart Items");
                        hf.getAllCartItems(setCartItems);
                    }}
                />
            </div>
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

            {/* RENDER THE CATEGORIES TABLE */}
            {categories && <CategoriesDashboard categories={categories} />}

            {/* RENDER THE ORDER ITEMS TABLE */}
            {orderItems && <OrderItemsDashboard orderItems={orderItems} />}

            {/* RENDER THE CARTS TABLE */}
            {carts && <CartsDashboard carts={carts} />}
            
            {/* RENDER THE CART ITEMS TABLE */}
            {cartItems && <CartItemsDashboard cartItems={cartItems} />}
            {/* RENDER THE DISCOUNTS TABLE */}
            {discounts && (
                <>
                    <DiscountsDashboard
                        discounts={discounts}
                        setSelectedDiscount={setSelectedDiscount}
                        setShowDiscountDeleteDialog={
                            setShowDiscountDeleteDialog
                        }
                    />
                    <Button
                        label="Add Discount Code"
                        onClick={() => setShowAddDiscountForm(true)}
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
                }}
            >
                <AddProductForm
                    setShowAddProductForm={setShowAddProductForm}
                    getAllProducts={() => hf.getAllProducts(setProducts)}
                />
            </Dialog>

            {/* RENDER THE ADD DISCOUNT CODE FORM */}
            <Dialog
                header="Add Discount Code"
                visible={showAddDiscountForm}
                style={{ width: "50vw" }}
                onHide={() => {
                    setShowAddDiscountForm(false);
                }}
            >
                <AddDiscountForm
                    setShowAddDiscountForm={setShowAddDiscountForm}
                    getAllDiscounts={() => hf.getAllDiscounts(setDiscounts)}
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
                        getAllUsers={() => {
                            hf.getAllUsers(setUsers);
                        }}
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
                    hf.deleteUser(selectedUser.user_id, setUsers);
                }}
            ></ConfirmDialog>

            {/* RENDER THE DELETE DISCOUNT DIALOG */}
            <ConfirmDialog
                header="Delete Discount Code"
                visible={showDiscountDeleteDialog}
                onHide={() => setShowDiscountDeleteDialog(false)}
                message="Are you sure you want to delete this discount code?"
                accept={() => {
                    hf.deleteDiscount(
                        selectedDiscount.discount_code_id,
                        setDiscounts
                    );
                    setShowDiscountDeleteDialog(false);
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
                        getAllProducts={() => {
                            hf.getAllProducts(setProducts);
                        }}
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
                    hf.deleteProduct(selectedProduct.prod_id, setProducts);
                    setShowProductDeleteDialog(false);
                }}
            ></ConfirmDialog>
        </div>
    );
};

export default AdminHomePage;
