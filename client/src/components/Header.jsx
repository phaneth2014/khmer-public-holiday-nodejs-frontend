import React from "react";

export default function Header() {
  return (
    <nav>
      <input type="checkbox" id="menu-toggle" />
      <label className="menu-icon">☰</label>

      <ul className="header-menu">
        <label className="menu-icon" id="menu-close">
          X
        </label>

        <li>
          <a
            href="/"
            title="home"
            id="pg-home"
            component="home/component"
            className=""
          >
            <i className="bi bi-house"></i> ប្រតិទិន
          </a>
        </li>
        <li>
          <a
            href="/holiday"
            title="holidays"
            component="holiday/component"
            className=""
          >
            <i className="bi bi-calendar"></i> ថ្ងៃឈប់សម្រាក
          </a>
        </li>

        <li>
          <a
            href="/exchange-rate"
            title="exchange rate"
            component="exchange-rate/component"
            className=""
          >
            <i className="bi bi-currency-exchange"></i> អត្រាប្តូរប្រាក់
          </a>
        </li>
        <li>
          <a
            href="/market"
            title="market"
            component="market/component"
            className=""
          >
            <i className="bi bi-cart"></i> ទីផ្សារ/ហាងឆេង
          </a>
        </li>

        <li>
          <a
            href="/api-data"
            title="api-data"
            component="api-data/component"
            className=""
          >
            <i className="bi bi-database"></i> ទិន្ន័យ API
          </a>
        </li>
        <li>
          <a
            href="/about"
            title="about"
            component="about/component"
            className=""
          >
            <i className="bi bi-info-circle"></i> អំពីយើង
          </a>
        </li>
        <li>
          <a
            href="/terms"
            title="terms"
            component="terms/component"
            className=""
          >
            <i className="bi bi-key"></i> លក្ខខណ្ឌប្រើប្រាស់
          </a>
        </li>
      </ul>
      <ul className="header-menu-right">
        <li>
          <a href="#" id="theme-toggle" data-mode="light">
            <i className="bi bi-moon" id="theme-icon"></i>
          </a>
        </li>

        <li id="account">
          <a
            href="/settings"
            title="settings"
            component="settings/component"
            className=""
          >
            <i className="bi bi-person-circle"></i> Account
          </a>
        </li>
        <li id="account-login">
          <a
            href="/register"
            title="Register"
            component="register/component"
            id="register-link"
            className=""
          >
            <i className="bi bi-person"></i> ចុះឈ្មោះ
          </a>
        </li>

        <li id="account-register">
          <a
            href="/login"
            title="Login"
            component="login/component"
            id="login-link"
            className=""
          >
            <i className="bi bi-lock"></i> ចូល
          </a>
        </li>
      </ul>
    </nav>
  );
}
