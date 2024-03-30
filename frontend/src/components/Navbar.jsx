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
            onclick: () => {
                localStorage.removeItem("token");
            },
        },
        {
            label: "Settings",
            href: "/settings",
        },
    ];

    return (
        <ul className="menu">
            {items.map((item, index) => (
                <li key={index}>
                    <NavLink to={item.href} onClick={item.onclick}>
                        {item.label}
                    </NavLink>
                </li>
            ))}
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
