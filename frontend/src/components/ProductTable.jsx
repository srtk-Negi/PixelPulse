import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import axios from "axios";
import { Toast } from "primereact/toast";

export const addToCart = async (prod_id) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
        await axios.post(`/api/cart/carts/${prod_id}`, null, {
            headers: headers,
        });
    } catch (error) {
        throw error;
    }
};

const ProductCard = ({ product, showProductAdded, prodAddWarning }) => {
    let severity;
    let severityString;
    let stock = product.items_in_stock;

    const setSeverityData = () => {
        if (stock > 50) {
            severity = "success";
            severityString = "In Stock";
        } else if (stock > 0) {
            severity = "warning";
            severityString = `Only ${stock} left in Stock`;
        } else {
            severity = "danger";
            severityString = "Out of Stock";
        }
    };

    setSeverityData();

    return (
        <div className="productCard">
            <div className="productImg">
                <img src={product.image_url} alt={product.title} />
            </div>
            <div className="details">
                <div className="prodName">{product.name}</div>
                <div className="category">{product.category}</div>
                <div className="description">{product.description}</div>
                <div className="priceStock">
                    <div className="price">${product.price}</div>
                    <Tag
                        className="tag"
                        value={product.items_in_stock}
                        severity={severity}
                    />
                    <Tag
                        className="tag"
                        value={severityString}
                        severity={severity}
                    />
                </div>
                <Button
                    label="Add to Cart"
                    icon="pi pi-shopping-cart"
                    disabled={stock === 0}
                    className="p-button-raised p-button-rounded"
                    onClick={() => {
                        addToCart(product.prod_id)
                            .then(() => showProductAdded(product.name))
                            .catch(() => prodAddWarning(product.name));
                    }}
                />
            </div>
        </div>
    );
};

const ProductTable = ({ products, sortConstraint, availability }) => {
    const toast = useRef(null);

    const showProductAdded = (prod_name) => {
        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: `${prod_name} added to cart!`,
            life: 3000,
        });
    };

    const prodAddWarning = (prod_name) => {
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: `${prod_name} already exists in the cart!`,
            life: 3000,
        });
    };

    if (sortConstraint) {
        products.sort((a, b) => {
            if (sortConstraint === "Price: Low to High") {
                return a.price - b.price;
            } else if (sortConstraint === "Price: High to Low") {
                return b.price - a.price;
            }
        });
    }

    if (availability) {
        products = products.filter((product) => {
            if (availability === "In Stock") {
                return product.items_in_stock > 0;
            } else if (availability === "Out of Stock") {
                return product.items_in_stock === 0;
            }
        });
    }

    return (
        <div className="productTable">
            <Toast ref={toast} />
            {products.map((product, index) => (
                <ProductCard
                    key={product.prod_id}
                    product={product}
                    showProductAdded={showProductAdded}
                    prodAddWarning={prodAddWarning}
                />
            ))}
        </div>
    );
};

export default ProductTable;
