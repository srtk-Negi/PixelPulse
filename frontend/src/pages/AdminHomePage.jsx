import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminHomePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await axios.get("/api/auth/userType");
                if (response.user_type !== "admin") {
                    navigate("/unauthorized");
                }
            } catch (error) {
                console.error(error);
            }
        };
        checkUser();
    }, []);

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
