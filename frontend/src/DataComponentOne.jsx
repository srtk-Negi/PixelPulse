import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DataComponentOne() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/data1")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="datacompone">
            {data ? (
                <div>
                    <h1>Data from API</h1>
                    <h1>{JSON.stringify(data, null, 2)}</h1>
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}
