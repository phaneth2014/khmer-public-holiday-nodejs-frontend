import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import server from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const tokenType = import.meta.env.VITE_TOKEN_TYPE;

  function formatUnix(unix) {
    const d = new Date(unix * 1000);
    return d.toISOString().replace("T", " ").split(".")[0];
  }

    // ✅ Logout function — remove token & redirect
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
     
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("exp");
      localStorage.removeItem("user");
      const res = await server.api.post(
        "/auth/logout",
        {
          token,
          user,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ); // backend logout (if implemented)
       console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.warn("Logout error:", err.message);
    }
  };
  // ✅ Automatically check if token expired
  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem("token");
      const expiredDate = localStorage.getItem("exp");

      if (!storedToken) return;

      try {
        const currentTime = Date.now() / 1000;

        if (tokenType === "sanctum") {
          //  logout();
          if (expiredDate && expiredDate < currentTime) {
            logout();
          }
        } else {
          const decoded = jwtDecode(storedToken);
          // console.log("Checking token expiry:", decoded.exp, currentTime);
          
          if (decoded.exp && decoded.exp < currentTime) {
            logout(); // token expired
          }
        }
      } catch {
        console.log("still valid token");
      }
    };

    checkToken(); // check immediately
    const interval = setInterval(checkToken, 10000); // check every 10s

    return () => clearInterval(interval);
  }, []);

  // ✅ Login function — store token
  const login = (newToken, exp = null, user = null) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    localStorage.setItem("exp", exp);
    localStorage.setItem("user", user);
    // console.log(newToken);
    console.log(formatUnix(exp));
  };



  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
// eslint-disable-next-line react-refresh/only-export-components
export default useAuth;
