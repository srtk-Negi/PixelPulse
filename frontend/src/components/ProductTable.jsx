import React from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

const ProductCard = ({ product }) => {
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
                    <Tag value={severityString} severity={severity} />
                </div>
                <Button
                    label="Add to Cart"
                    icon="pi pi-shopping-cart"
                    disabled={stock === 0}
                />
            </div>
        </div>
    );
};

const ProductTable = ({ products, sortConstraint, availability }) => {
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
            {products.map((product, index) => (
                <ProductCard key={product.prod_id} product={product} />
            ))}
        </div>
    );
};

export default ProductTable;
