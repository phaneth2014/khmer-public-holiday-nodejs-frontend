import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import ProfileMenu from "../components/ProfileMenu";


export default function Header() {
  const [sidebar, setSidebar] = useState(false);

  const menuToggle = () => {
    setSidebar(!sidebar);
    localStorage.setItem('sidebar',!sidebar);
  };

  const hideSidebar=()=>{
    setSidebar(false);
  }

  const saveTrackingData = async (data) => {
  try {
    await fetch(`${import.meta.env.VITE_APP_URL}/api/track-device`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip_address: data.ip,      // from ipapi.co
        device_type: data.type,   // from react-device-detect
        os_name: data.os,
        browser_name: data.browser,
        user_agent: navigator.userAgent,
        // ... include other fields
      }),
    });
  } catch (error) {
    console.error("Storage failed", error);
  }
};

saveTrackingData();
  return (
    <nav className="nav-header">
      <label className="menu-icon" onClick={menuToggle}>
        ᯓ
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
            <i className="bi bi-clock"></i> ព្រឹត្តិការណ៍ផ្សេងៗ
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
        {/* <li>
          <NavLink to="/terms" onClick={hideSidebar} title="terms">
            <i className="bi bi-key"></i> លក្ខខណ្ឌប្រើប្រាស់
          </NavLink>
        </li> */}
      </ul>
      <ul className="header-menu-right">
        <li>
          <ThemeToggle />
        </li>
          
        <ProfileMenu/>
      </ul>
    </nav>
  );
}
