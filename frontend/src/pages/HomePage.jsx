import axios from "axios";
import ProductTable from "../components/ProductTable";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [category, setCategory] = useState(null);
    const [search, setSearch] = useState("");

    const categories = [
        { label: "All", value: null },
        { label: "Headphones", value: "Headphones" },
        { label: "Monitors", value: "Monitor" },
        { label: "Keyboards", value: "Keyboard" },
        { label: "Mouse", value: "Mouse" },
        { label: "Router", value: "Router" },
        { label: "GPU", value: "GPU" },
        { label: "Motherboard", value: "Motherboard" },
        { label: "Memory RAM", value: "Memory RAM" },
        { label: "Gaming Controller", value: "Gaming Controller" },
    ];

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const { data } = await axios.get("/api/product/products", {
                    timeout: 5000,
                    params: { category, search },
                });
                setProducts(data);
                setLoading(false);
            };
            fetchProducts();
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }, [category, search]);

    return (
        <div id="homePageContainer">
            {loading && <LoadingSpinner />}
            {error && <h2>{error.message}</h2>}
            {!loading && (
                <>
                    <div className="filters">
                        <Dropdown
                            value={category}
                            options={categories}
                            onChange={(e) => setCategory(e.value)}
                            optionLabel="label"
                            placeholder="Select a Category"
                        />
                        <InputText
                            placeholder="Search..."
                            className="p-mr-2"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <ProductTable products={products} />
                </>
            )}
        </div>
    );
};

export default HomePage;
