import React from "react";
import axios from "axios";

const UserUpdateForm = ({ user }) => {
    const [newUser, setNewUser] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userType: "",
    });

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `/api/admin/users/update/${user.user_id}`,
                newUser
            );
            setUsers((users) =>
                users.map((u) =>
                    u.user_id === user.user_id ? response.data : u
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update User</h2>
            <label htmlFor="firstName">First Name</label>
            <input
                type="text"
                name="firstName"
                id="firstName"
                value={newUser.firstName}
                onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
                type="text"
                name="lastName"
                id="lastName"
                value={newUser.lastName}
                onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                value={newUser.email}
                onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                value={newUser.password}
                onChange={handleChange}
            />
            <label htmlFor="userType">User Type</label>
            <select
                name="userType"
                id="userType"
                value={newUser.userType}
                onChange={handleChange}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
            </select>
            <button type="submit">Update User</button>
        </form>
    );
};

export default UserUpdateForm;
