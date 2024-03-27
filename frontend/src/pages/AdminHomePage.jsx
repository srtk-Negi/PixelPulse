import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { Button } from "primereact/button";
import AdminDashboard from "../components/AdminDashboard";
import UserUpdateForm from "../components/UserUpdateForm";

const AdminHomePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState(null);
    const [selectedUser, setSelectedUser] = React.useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                await axios.get("/api/auth/userType");
            } catch (error) {
                navigate("/unauthorized");
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    return (
        <div id="adminPageContainer">
            <h1>Admin Home Page</h1>
            <Button
                onClick={async () => {
                    try {
                        const response = await axios.get("/api/admin/users");
                        setUsers(response.data);
                        setLoading(false);
                    } catch (error) {
                        console.error(error);
                    }
                }}
            >
                Get All Users
            </Button>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <AdminDashboard
                    users={users}
                    setSelectedUser={setSelectedUser}
                />
            )}
        </div>
    );
};

export default AdminHomePage;
