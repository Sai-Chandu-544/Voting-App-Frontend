import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

export const AdminRegisterForm = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
   
  });


const [loading,setLoading]=useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    
  e.preventDefault();

  const url = "https://voting-app-backend-ii6g.onrender.com/admin/register";
   setLoading(true)
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setLoading(false)
    // console.log("Response:", data);
    
    if(response.ok ){
      alert(data.message || "Admin Registered Successfully");
     
      navigate("/admin/login");
      
    }else if (response.status === 400) {
      alert(data.message || "All fields are required");
    }
    else if (response.status===401){
      alert("Admin already registered!")
    }else{
        alert("Something Went Wrong!")
    }
  
 
  } catch (err) {
    console.log("Registration error:", err);
    alert("Server Problem")

  }
};

  return (
  <>
    {loading ? (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading">Loading...</p>
      </div>
    ) : (

    <div className="main-register-container">
         <form className="form-container" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

         <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
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
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

     
    

        <button type="submit" className="submit-btn">Register</button>
      </form>

      </div>
     
    )}
  </>
);

};

 