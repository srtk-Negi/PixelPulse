import React from "react";
import { Button } from "primereact/button";

const ProductCard = ({ product }) => {
    return (
        <div className="productCard">
            <div className="productImg">
                <img src={product.image_url} alt={product.title} />
            </div>
            <div className="details">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
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
