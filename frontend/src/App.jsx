//PRIMEREACT IMPORTS
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

//REACT IMPORTS
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

// LAYOUTS IMPORTS
import Layout from "./layouts/RootLayout";

// PAGES IMPORTS
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AdminHomePage from "./pages/AdminHomePage";
import Unauthorized from "./pages/Unauthorized";

//STYLES IMPORTS
import "./assets/css/adminHomePage.css";
import "./assets/css/errorPage.css";
import "./assets/css/homePage.css";
import "./assets/css/login.css";
import "./assets/css/register.css";
import "./assets/css/unauthorized.css";
import "./assets/css/navbar.css";

const App = () => {
    return (
        <PrimeReactProvider>
            <div className="app">
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/home"
                            element={
                                <Layout navType="user">
                                    <HomePage />
                                </Layout>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <Layout navType="admin">
                                    <AdminHomePage />
                                </Layout>
                            }
                        />
                        <Route
                            path="/unauthorized"
                            element={<Unauthorized />}
                        />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Router>
            </div>
        </PrimeReactProvider>
    );
};

export default App;
