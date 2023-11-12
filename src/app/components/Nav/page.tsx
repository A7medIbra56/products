"use client";
import { useState } from "react";
import Link from "next/link";
import "./nav.css";

const Nav = () => {
  const [activeItem, setActiveItem] = useState<Number>();

  const handleItemClick = (index: Number) => {
    setActiveItem(index);
  };

  const navItems = [
    { href: "/", text: "Home", icon: "fa-house" },
    { href: "/components/products", text: "Products", icon: "fa-shield" },
    { href: "/components/carts", text: "Carts", icon: "fa-cart-shopping" },
    { href: "/components/users", text: "Users", icon: "fa-user" },
    { href: "/components/posts", text: "Posts", icon: "fa-signs-post" }
  ];

  return (
    <>
      <nav className="main-menu position-fixed bottom-0 top-0">
        <h1>Fitness App</h1>
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${index === activeItem ? "active" : ""}`}
              onClick={() => handleItemClick(index)}
            >
              <b></b>
              <b></b>
              <Link href={item.href}>
                <i className={`fa ${item.icon} nav-icon`}></i>
                <span className="nav-text">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
