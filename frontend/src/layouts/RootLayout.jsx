import React from "react";
import Navbar from "../components/Navbar";

function Layout({ children }) {
    return (
        <div className="layout">
            <Navbar />
            {children}
        </div>
    );
}

export default Layout;
