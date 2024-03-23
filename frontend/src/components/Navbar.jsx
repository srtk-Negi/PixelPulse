import { NavLink } from "react-router-dom";
import "../assets/css/navbar.css";

function NavElements() {
    const items = [
        {
            label: "Home",
            href: "/home",
        },
        {
            label: "LogOut",
            href: "/login",
        },
        {
            label: "Settings",
            href: "/settings",
        },
    ];

    return (
        <ul className="menu">
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
    const logo = <div className="logo">PixelPulse</div>;

    return (
        <div id="header">
            {logo}
            <NavElements />
        </div>
    );
}
