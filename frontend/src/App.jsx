//PRIMEREACT IMPORTS
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    return (
        <PrimeReactProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </PrimeReactProvider>
    );
}

export default App;
