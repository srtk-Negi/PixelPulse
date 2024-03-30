import axios from "axios";
import ProductTable from "../components/ProductTable";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const [category, setCategory] = useState(null);
    const [search, setSearch] = useState(null);

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

    const getAllProducts = async (category = null, search = null) => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/product/products", {
                params: { category, search },
            });
            setProducts(data);
            setLoading(false);
        } catch (error) {
            setErrorMessage(error.response.data.detail);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProducts(category, search);
    }, [category, search]);

    return (
        <div id="homePageContainer">
            {loading && <LoadingSpinner />}
            {errorMessage && (
                <>
                    <h2>{errorMessage}</h2>
                    <Button
                        label="Retry"
                        icon="pi pi-refresh"
                        className="p-button-raised p-button-rounded"
                        onClick={() => {
                            setErrorMessage(null);
                            getAllProducts();
                        }}
                    />
                </>
            )}
            {!loading && !errorMessage && (
                <>
                    <div className="filters">
                        <Dropdown
                            value={category}
                            options={categories}
                            onChange={(e) => {
                                setSearch(null);
                                setCategory(e.value);
                            }}
                            optionLabel="label"
                            placeholder="Select a Category"
                        />
                        <div>
                            <InputText
                                className="p-mr-2"
                                placeholder="Search"
                                id="searchBar"
                            />
                            <Button
                                label="Search"
                                icon="pi pi-search"
                                className="p-button-raised p-button-rounded"
                                onClick={() => {
                                    setCategory(null);
                                    setSearch(
                                        document.getElementById("searchBar")
                                            .value
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <ProductTable products={products} />
                </>
            )}
        </div>
    );
};

export default HomePage;
