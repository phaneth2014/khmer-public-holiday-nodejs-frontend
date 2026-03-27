import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Header() {
  const [sidebar, setSidebar] = useState(false);

  const menuToggle = () => {
    setSidebar(!sidebar);
    localStorage.setItem('sidebar',!sidebar);
  };

  const hideSidebar=()=>{
    setSidebar(false);
  }

  return (
    <nav className="nav-header">
      <label className="menu-icon" onClick={menuToggle}>
        ☰
      </label>

      <ul className={`${sidebar ? "sidebar" : "header-menu"}`}>
        <label className="menu-icon" onClick={menuToggle}>
          X
        </label>

        <li >
          <NavLink to="/" onClick={hideSidebar} title="home" id="pg-home">
            <i className="bi bi-house"></i> ប្រតិទិន
          </NavLink>
        </li>
        <li>
          <NavLink onClick={hideSidebar} to="/holiday" title="holidays">
            <i className="bi bi-calendar"></i> ថ្ងៃឈប់សម្រាក
          </NavLink>
        </li>

        <li>
          <NavLink to="/exchange-rate" onClick={hideSidebar} title="exchange rate">
            <i className="bi bi-currency-exchange"></i> អត្រាប្តូរប្រាក់
          </NavLink>
        </li>
        <li>
          <NavLink to="/market" onClick={hideSidebar} title="market">
            <i className="bi bi-cart"></i> ទីផ្សារ/ហាងឆេង
          </NavLink>
        </li>

        <li>
          <NavLink to="/api-data" onClick={hideSidebar} title="api-data">
            <i className="bi bi-database"></i> ទិន្ន័យ API
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" onClick={hideSidebar} title="about">
            <i className="bi bi-info-circle"></i> អំពីយើង
          </NavLink>
        </li>
        <li>
          <NavLink to="/terms" onClick={hideSidebar} title="terms">
            <i className="bi bi-key"></i> លក្ខខណ្ឌប្រើប្រាស់
          </NavLink>
        </li>
      </ul>
      <ul className="header-menu-right">
        <li>
          <ThemeToggle />
        </li>

        <li id="account-login">
          <NavLink to="/register" title="Register">
            <i className="bi bi-person"></i> ចុះឈ្មោះ
          </NavLink>
        </li>

        <li id="account-register">
          <NavLink to="/login" title="Login">
            <i className="bi bi-lock"></i> ចូល
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
