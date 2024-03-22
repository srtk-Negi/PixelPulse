import { InputText } from "primereact/inputtext";
import { Formik, Form, ErrorMessage } from "formik";
import { Button } from "primereact/button";
import { registrationSchema } from "../schemas";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    return (
        <div className="registrationContainer">
            <Formik
                validationSchema={registrationSchema}
                initialValues={{
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    user_type: "user",
                    phone: "",
                    address: "",
                }}
                onSubmit={async (values) => {
                    try {
                        const response = await axios.post(
                            "/api/user/register",
                            values
                        );
                        setSuccess("Registration successful");
                    } catch (error) {
                        setError(error.response.data.detail);
                        console.log(error.response.data);
                    }
                }}
            >
                {({ values, handleSubmit, handleChange }) => (
                    <Form onSubmit={handleSubmit}>
                        {/* first_name*/}
                        <div className="formField">
                            <label htmlFor="first_name">First Name</label>
                            <InputText
                                id="first_name"
                                type="text"
                                name="first_name"
                                values={values.first_name}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                name="first_name"
                                render={(msg) => (
                                    <small id="title-help" className="p-error">
                                        {msg}
                                    </small>
                                )}
                            />
                        </div>
                        {/* last_name*/}
                        <div className="formField">
                            <label htmlFor="last_name">Last Name</label>
                            <InputText
                                id="last_name"
                                type="text"
                                name="last_name"
                                values={values.last_name}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                name="last_name"
                                render={(msg) => (
                                    <small id="title-help" className="p-error">
                                        {msg}
                                    </small>
                                )}
                            />
                        </div>
                        {/* email*/}
                        <div className="formField">
                            <label htmlFor="email">Email</label>
                            <InputText
                                id="email"
                                type="email"
                                name="email"
                                values={values.email}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                name="email"
                                render={(msg) => (
                                    <small id="title-help" className="p-error">
                                        {msg}
                                    </small>
                                )}
                            />
                        </div>
                        {/* password*/}
                        <div className="formField">
                            <label htmlFor="password">Password</label>
                            <InputText
                                id="password"
                                type="password"
                                name="password"
                                values={values.password}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                name="password"
                                render={(msg) => (
                                    <small id="title-help" className="p-error">
                                        {msg}
                                    </small>
                                )}
                            />
                        </div>
                        {/* phone*/}
                        <div className="formField">
                            <label htmlFor="phone">Phone</label>
                            <InputText
                                id="phone"
                                type="text"
                                name="phone"
                                values={values.phone}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                name="phone"
                                render={(msg) => (
                                    <small id="title-help" className="p-error">
                                        {msg}
                                    </small>
                                )}
                            />
                        </div>
                        {/* address*/}
                        <div className="formField">
                            <label htmlFor="address">Address</label>
                            <InputText
                                id="address"
                                type="text"
                                name="address"
                                values={values.address}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                name="address"
                                render={(msg) => (
                                    <small id="title-help" className="p-error">
                                        {msg}
                                    </small>
                                )}
                            />
                        </div>
                        <div className="buttons">
                            <Button type="submit" label="Register" />
                            <Button
                                type="button"
                                label="Back to Login"
                                onClick={() => navigate("/login")}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
            {success && <div className="success">{success}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default RegisterPage;
