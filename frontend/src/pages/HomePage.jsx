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
    const [sortConstraint, setSortConstraint] = useState(null);
    const [availability, setAvailability] = useState(null);

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

    const sortOptions = [
        { label: "Price: Low to High", value: "Price: Low to High" },
        { label: "Price: High to Low", value: "Price: High to Low" },
    ];

    const availabilityOptions = [
        { label: "In Stock", value: "In Stock" },
        { label: "Out of Stock", value: "Out of Stock" },
    ];

    const getAllProducts = async (category = null, search = null) => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        };
        try {
            setLoading(true);
            const { data } = await axios.get("/api/product/products", {
                params: { category, search },
                headers: headers,
            });
            setProducts(data);
            setLoading(false);
        } catch (error) {
            setErrorMessage(error.response.data.detail);
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
                        <div className="dropdowns">
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
                            <Dropdown
                                value={sortConstraint}
                                options={sortOptions}
                                onChange={(e) => setSortConstraint(e.value)}
                                optionLabel="label"
                                placeholder="Sort by"
                            />

                            <Dropdown
                                value={availability}
                                options={availabilityOptions}
                                onChange={(e) => {
                                    setAvailability(e.value);
                                }}
                                optionLabel="label"
                                placeholder="Filter by Availablity"
                            />
                        </div>

                        <div className="textSearch">
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
                    <ProductTable
                        products={products}
                        sortConstraint={sortConstraint}
                        availability={availability}
                    />
                </>
            )}
        </div>
    );
};

export default HomePage;
