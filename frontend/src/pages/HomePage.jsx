import axios from "axios";
import ProductTable from "../components/ProductTable";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get("/api/product/products");
            setProducts(data);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    return (
        <div id="homePageContainer">
            <h1>Home Page</h1>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h2>Products</h2>
                    <ProductTable products={products} />
                </>
            )}
        </div>
    );
};

export default HomePage;
