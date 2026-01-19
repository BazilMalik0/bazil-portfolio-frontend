import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { portfolioData } from "../../data.js";

const Navbar = () => {
  const location = useLocation(); // Helps identify the current active page

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        Malik.<span>Dev</span>
      </div>
      <ul className={styles.navLinks}>
        {portfolioData.navLinks.map((link, index) => (
          <li
            key={index}
            className={location.pathname === link.url ? styles.active : ""}
          >
            <Link to={link.url}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
