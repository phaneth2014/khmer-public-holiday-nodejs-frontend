import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProfileMenu({authenticated}) {
    const [user, setUser] = React.useState(null);
    useEffect(() => {
      const token = authenticated ? localStorage.getItem('token') : null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(token ? jwtDecode(token) : null);
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      console.log(token)
    }, []);
  return (
    <>{user || authenticated && <li>
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
