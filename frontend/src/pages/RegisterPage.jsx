import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
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

    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        user_type: "user",
        phone: "",
        address: "",
    };

    return (
        <div id="signUpPage">
            <div className="registrationContainer">
                <h2 className="registerHeader">Sign Up!</h2>
                <Formik
                    validationSchema={registrationSchema}
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        try {
                            const response = await axios.post(
                                "/api/user/register",
                                values
                            );
                            setError(null);
                            setSuccess("Registration successful");
                        } catch (error) {
                            setSuccess(null);
                            setError(error.response.data.detail);
                            console.log(error.response.data);
                        }
                    }}
                >
                    {({ values, handleSubmit, handleChange }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="formFieldGroup">
                                {/* first_name*/}
                                <div className="formField">
                                    <label htmlFor="first_name">
                                        First Name
                                    </label>
                                    <InputText
                                        id="first_name"
                                        type="text"
                                        name="first_name"
                                        values={values.first_name}
                                        onChange={handleChange}
                                        placeholder="John..."
                                    />
                                    <ErrorMessage
                                        name="first_name"
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
                                {/* last_name*/}
                                <div className="formField">
                                    <label htmlFor="last_name">Last Name</label>
                                    <InputText
                                        id="last_name"
                                        type="text"
                                        name="last_name"
                                        values={values.last_name}
                                        onChange={handleChange}
                                        placeholder="Doe..."
                                    />
                                    <ErrorMessage
                                        name="last_name"
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
                            </div>
                            <div className="formFieldGroup">
                                {/* email*/}
                                <div className="formField">
                                    <label htmlFor="email">Email</label>
                                    <InputText
                                        id="email"
                                        type="email"
                                        name="email"
                                        values={values.email}
                                        onChange={handleChange}
                                        placeholder="someone@abc.com"
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
                                {/* Phone Number*/}
                                <div className="formField">
                                    <label htmlFor="phone">Phone</label>
                                    <InputText
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        values={values.phone}
                                        onChange={handleChange}
                                        placeholder="123-456-7890"
                                    />
                                    <ErrorMessage
                                        name="phone"
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
                            </div>
                            <div className="formFieldGroup">
                                {/* password*/}
                                <div className="formField">
                                    <label htmlFor="password">Password</label>
                                    <InputText
                                        id="password"
                                        type="password"
                                        name="password"
                                        values={values.password}
                                        onChange={handleChange}
                                        placeholder="secure..."
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
                            </div>
                            <div className="formFieldGroup">
                                {/* address*/}
                                <div className="formField">
                                    <label htmlFor="address">Address</label>
                                    <InputTextarea
                                        id="address"
                                        type="text"
                                        name="address"
                                        values={values.address}
                                        onChange={handleChange}
                                        placeholder="123 Main St..."
                                    />
                                    <ErrorMessage
                                        name="address"
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
                            </div>
                            <div className="buttons">
                                <Button type="submit" label="Register" />
                            </div>
                        </Form>
                    )}
                </Formik>
                {success && <div className="success">{success}</div>}
                {error && <div className="error">{error}</div>}
            </div>
            <Button
                type="button"
                label="Back to Login"
                onClick={() => navigate("/login")}
            />
        </div>
    );
};

export default RegisterPage;
