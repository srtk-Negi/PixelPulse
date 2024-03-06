import { InputText } from "primereact/inputtext";

const Login = () => {
    return (
        <div className="loginContainer">
            <h2>Login</h2>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" type="email" placeholder="email" />
                </div>
                <div className="p-field">
                    <label htmlFor="password">Password</label>
                    <InputText id="password" type="password" />
                </div>
            </div>
        </div>
    );
};

export default Login;
