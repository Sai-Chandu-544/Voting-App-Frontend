import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext} from './context'
import { AuthContext } from "../auth";



export const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {setName}=useContext(UserContext)
    const { login } = useContext(AuthContext);

  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://voting-app-backend-ii6g.onrender.com/user/login";
    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);
      // console.log("Response:", data);

      if (response.ok) {
        alert(data.message || "Login Successfull");
        login(data.token,data.user._id,data.user.name);
        // console.log(data.user.name)
        // localStorage.setItem("Token",data.token)
        // localStorage.setItem("userId",data.user._id)
        setName(data.user.name)

        navigate("/user/data"); 
      } else if (response.status === 400) {
        alert(data.message || "All fields are required");
      } else if (response.status === 401) {
        alert("Please Register");
        navigate("/user/register")
      } else if (response.status === 402) {
        alert("Name is Incorrect");
      } else {
        alert("Unknown Error");
      }

    } catch (err) {
      console.log("Login error:", err);
      setLoading(false);
      alert("Server Problem");
    }
  };

  return (
    <>
    {loading ?
    ( <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading">Loading...</p>
      </div>
    ):(
    <div className="main-login-container">
       <form className="login-container" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn" >
        Login
      </button>
    </form>

    </div>
   
   
   )}
      </>
  );
};
