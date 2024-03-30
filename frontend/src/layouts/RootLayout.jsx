import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children, navType }) => {
    return (
        <div className="layout">
            <Navbar navType={navType} />
            {children}
        </div>
    );
};

export default Layout;
