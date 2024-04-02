import React from "react";
import axios from "axios";
import { Formik, Form, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useContext } from "react";
import { AdminContext } from "../../pages/AdminHomePage";

const UserUpdateForm = ({ user, setShowUserUpdateForm, getAllUsers }) => {
    const { token, setToken } = useContext(AdminContext);
    return (
        <Formik
            initialValues={{
                firstName: user.first_name,
                lastName: user.last_name,
                email: null,
                phone: user.phone,
                address: user.address,
                password: null,
                userType: user.user_type,
            }}
            onSubmit={async (values) => {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                };
                try {
                    const response = await axios.patch(
                        `/api/admin/users/update/${user.user_id}`,
                        values,
                        { headers: headers }
                    );
                    setShowUserUpdateForm(false);
                    getAllUsers();
                } catch (error) {
                    console.error(error);
                }
            }}
        >
            {({ handleChange, handleBlur, values }) => {
                return (
                    <Form className="updateForm">
                        <div className="inputsContainer">
                            <div className="formGroup">
                                <label htmlFor="firstName">First Name</label>
                                <InputText
                                    id="firstName"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="firstName" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="lastName">Last Name</label>
                                <InputText
                                    id="lastName"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="lastName" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="email">Phone Number</label>
                                <InputText
                                    id="phone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="phone" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="address">Address</label>
                                <InputText
                                    id="address"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="address" />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="userType">User Type</label>
                                <Dropdown
                                    id="userType"
                                    name="userType"
                                    value={values.userType}
                                    options={[
                                        { label: "Admin", value: "admin" },
                                        { label: "User", value: "user" },
                                    ]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="userType" />
                            </div>
                        </div>
                        <Button
                            type="submit"
                            label="Update User"
                            className="p-button-raised p-button-rounded p-button-success"
                        />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default UserUpdateForm;
