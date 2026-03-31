import React from 'react';
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProfileMenu() {
    const user = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null;
  
  return (
    <>{user && <li>
          <NavLink to="/settings" title="Settings">
            <i className="bi bi-user"></i> Account
          </NavLink>
        </li>}
        {!user && <><li id="account-login">
          <NavLink to="/register" title="Register">
            <i className="bi bi-person"></i> ចុះឈ្មោះ
          </NavLink>
        </li>

        <li id="account-register">
          <NavLink to="/login" title="Login">
            <i className="bi bi-lock"></i> ចូល
          </NavLink>
        </li></>}
    
    </>
  )
}
