import axios from "axios";
import ProductTable from "../components/ProductTable";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const { data } = await axios.get("/api/product/products", {
                    timeout: 5000,
                });
                setProducts(data);
                setLoading(false);
            };
            fetchProducts();
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }, []);

    return (
        <div id="homePageContainer">
            {loading && <LoadingSpinner />}
            {error && <h2>{error.message}</h2>}
            {!loading && (
                <>
                    <ProductTable products={products} />
                </>
            )}
        </div>
    );
};

export default HomePage;
