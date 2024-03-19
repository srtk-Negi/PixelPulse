import { InputText } from "primereact/inputtext";
import { Formik, Form, ErrorMessage } from "formik";
import { Button } from "primereact/button";
import "../assets/css/login.css";
import { loginSchema } from "../schemas";
import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [userData, setUserData] = useState({});

    const login = async (values) => {
        try {
            const response = await axios.post("/api/auth/login", values);
            setUserData(response.data);
            setSuccess("Login successful");
            setError(null);
        } catch (error) {
            setError(error.response.data.detail);
            setSuccess(null);
        }
    };

    return (
        <div className="loginContainer">
            <Formik
                validationSchema={loginSchema}
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={(values) => {
                    login(values);
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
                                component="div"
                                className="error"
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
                                component="div"
                                className="error"
                            />
                        </div>
                        <div className="buttons">
                            <Button type="submit" label="Login" />
                            <Button type="button" label="Register" />
                        </div>
                    </Form>
                )}
            </Formik>
            {success && <div className="success">{success}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default LoginPage;
