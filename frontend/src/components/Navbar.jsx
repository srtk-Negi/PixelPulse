import { NavLink } from "react-router-dom";
import "../assets/css/navbar.css";

function NavElements({ navType }) {
    let items = [];
    if (navType === "admin") {
        items = [
            {
                label: "Log Out",
                href: "/login",
                onclick: () => {
                    localStorage.removeItem("token");
                },
            },
        ];
    } else {
        items = [
            {
                label: "Home",
                href: "/home",
            },
            {
                label: "Cart",
                href: "/cart",
            },
            {
                label: "Orders",
                href: "/orders",
            },
            {
                label: "Log Out",
                href: "/login",
                onclick: () => {
                    localStorage.removeItem("token");
                },
            },
        ];
    }

    return (
        <ul className="menu">
            {items.map((item, index) => (
                <li key={index}>
                    <NavLink
                        to={item.href}
                        onClick={item.onclick}
                        className="nav-element"
                    >
                        {item.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default function Navbar({ navType }) {
    const logo = <div className="logo">PixelPulse</div>;

    return (
        <div id="header">
            {logo}
            <NavElements navType={navType} />
        </div>
    );
}
