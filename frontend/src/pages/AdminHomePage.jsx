import React from "react";
import axios from "axios";

const AdminHomePage = () => {
    return (
        <div>
            <h1>Admin Home Page</h1>
            <button
                onClick={async () => {
                    try {
                        const response = await axios.get("/api/admin/users");
                        console.log(response.data);
                    } catch (error) {
                        console.error(error);
                    }
                }}
            >
                All Users
            </button>
        </div>
    );
};

export default AdminHomePage;
