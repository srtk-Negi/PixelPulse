import React from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { useEffect } from "react";

const ProductCard = ({ product }) => {
    let severity;
    let severityString;

    const setSeverityData = () => {
        let stock = product.items_in_stock;
        if (stock > 50) {
            severity = "success";
            severityString = "In Stock";
        } else if (stock > 10) {
            severity = "warning";
            severityString = "Low Stock";
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
                <Button label="Add to Cart" icon="pi pi-shopping-cart" />
            </div>
        </div>
    );
};

const ProductTable = ({ products }) => {
    return (
        <div className="productTable">
            {products.map((product, index) => (
                <ProductCard key={product.prod_id} product={product} />
            ))}
        </div>
    );
};

export default ProductTable;
