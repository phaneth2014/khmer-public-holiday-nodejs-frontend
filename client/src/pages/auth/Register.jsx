import React, { useEffect, useState } from "react";
import useForm from "@phaneth_pho/react-useform-api";
import { Link, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { errors, loading, post } = useForm(import.meta.env.VITE_APP_URL);
  const storedToken = localStorage.getItem("token");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value, // Dynamic key based on the input name attribute
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await post("/api/register", form);
      if (res) {
        localStorage.setItem("token", res.token);
        navigate("/");
      }
    } catch (err) {
      console.error("API error:", err);
    }

    
  };


  useEffect(() => {
    const checkToken = () => {
      if (!storedToken) return;
      
      try {
        const decoded = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        if ( decoded.exp < currentTime) {
          console.log("token was expired");
        } else {        
          console.log(decoded);  
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkToken();
  }, []);
  return (
    <section>
      <label>បង្កើតគនេយ្យប្រើប្រាស់</label>

      <div className="panel">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ឈ្មោះ</label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>អ៊ីមែល</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>លេខសំងាត់</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>លេខសំងាត់</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm Password"
              className="form-control"
              onChange={handleChange}
            />
            {errors && (
              <p style={{ color: "red" }}>
                {errors.message || JSON.stringify(errors)}
              </p>
            )}
          </div>
          <button className={`btn ${loading && "loading"}`} disabled={loading}>
            <span>ចូលគណនី</span>
          </button>

          <p>
            មិនមានគណនីរួចហើយ? <Link to="/login">ចូលគណនី</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
