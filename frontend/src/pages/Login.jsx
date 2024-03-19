import { InputText } from "primereact/inputtext";
import { Formik, Form, ErrorMessage } from "formik";
import { Button } from "primereact/button";
import "../assets/css/login.css";
import { useState } from "react";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (credentials) => {
        setCredentials(credentials);
        console.log(credentials);
    };
    return (
        <div className="loginContainer">
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <div className="formField">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" type="email" name="email" />
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
        </div>
    );
};

export default Login;
