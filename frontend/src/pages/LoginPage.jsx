import { InputText } from "primereact/inputtext";
import { Formik, Form, ErrorMessage } from "formik";
import { Button } from "primereact/button";
import { loginSchema } from "../schemas";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const parseJwt = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    };

    const handleLogin = async (data) => {
        try {
            const response = await axios.post("/api/auth/login", data);
            setSuccess("Login successful");
            setError(null);
            localStorage.setItem("token", response.data.access_token);
        } catch (error) {
            throw error;
        }
    };

    return (
        <div id="loginPage">
            <div className="loginContainer">
                <div className="loginHeader">Login</div>
                <Formik
                    validationSchema={loginSchema}
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={async (values) => {
                        try {
                            await handleLogin(values);
                            const decodedToken = parseJwt(
                                localStorage.getItem("token")
                            );

                            if (decodedToken.user_type === "admin") {
                                navigate("/admin");
                            } else if (decodedToken.user_type === "user") {
                                navigate("/home");
                            } else {
                                console.error("Invalid user type");
                            }
                        } catch (error) {
                            setError(error.response.data.detail);
                            setSuccess(null);
                        }
                    }}
                >
                    {({ values, handleSubmit, handleChange }) => (
                        <Form onSubmit={handleSubmit}>
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
                                        <small
                                            id="title-help"
                                            className="p-error"
                                        >
                                            {msg}
                                        </small>
                                    )}
                                />
                            </div>
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
                                        <small
                                            id="title-help"
                                            className="p-error"
                                        >
                                            {msg}
                                        </small>
                                    )}
                                />
                            </div>
                            <div className="buttons">
                                <Button type="submit" label="Login" />
                            </div>
                        </Form>
                    )}
                </Formik>
                {success && <div className="success">{success}</div>}
                {error && <div className="error">{error}</div>}
            </div>
            <p>Don't have an account?</p>
            <Link to="/register">
                <Button label="Sign Up!" />
            </Link>
        </div>
    );
};

export default LoginPage;
