import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

export const RegistrationForm = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    phoneNo: '',
    adhaarNo: ''
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

  const url = "https://voting-app-backend-ii6g.onrender.com/user/register";
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
     
      navigate("/user/login");
      
    }else if (response.status === 401) {
      alert(data.message || "All fields are required");
    }else if(response.status===402){
      alert("Age must be 18 or greater")
    }else if(response.status===403){
      alert("Phone Number must be exactly 10 digits")
    }else if (response.status===404){
      alert("User already registered!")
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

      <div className="form-group">
        <label>Gender</label>
        <div className="gender-options">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              required
            />{' '}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              required
            />{' '}
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === 'other'}
              onChange={handleChange}
              required
            />{' '}
            Other
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          min="1"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNo"
          placeholder="Enter your phone number"
          maxLength="10"
          value={formData.phoneNo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Aadhaar Number</label>
        <input
          type="text"
          name="adhaarNo"
          placeholder="Enter your Aadhaar number"
          maxLength="12"
          value={formData.adhaarNo}
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

 