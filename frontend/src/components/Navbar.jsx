import React, { useState } from "react";
import { Avatar } from "primereact/avatar";
import { NavLink } from "react-router-dom";
import "../assets/css/navbar.css";

function NavElements({ isMenuOpen }) {
    const items = [
        {
            label: "Home",
            href: "/home",
        },
        {
            label: "About",
            href: "/aboutMe",
        },
        {
            label: "Projects",
            href: "/projects",
        },
        {
            label: "Resume",
            href: "/resume",
        },
        {
            label: "Contact",
            href: "/contact",
        },
    ];

    return (
        <ul className={`menu ${isMenuOpen ? "open" : ""}`}>
            {items.map((item, index) => {
                return (
                    <li key={index} className="p-mr-1 text-with-line-hover">
                        <NavLink className="nav-element" to={item.href}>
                            {item.label}
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    );
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    const avatar = (
        <div className="avatar">
            <Avatar shape="circle" size="xlarge">
                PixelPulse
            </Avatar>
        </div>
    );

    return (
        <div id="header">
            {avatar}
            <NavElements isMenuOpen={isMenuOpen} />
        </div>
    );
}
