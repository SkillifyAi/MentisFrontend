import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router';

export default function Register() {
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "member" // default role
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");

  const handleChange = (e) => {
    const { id, value, type, name } = e.target;

    if (type === "radio") {
      setData(prev => ({ ...prev, role: value }));
    } else {
      setData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSucces("");
  
    // ✅ Frontend form validation
    const { name, surname, email, password, role } = data;
  
    // Basic email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!name || !surname || !email || !password || !role) {
      setError("Please fill out all fields.");
      return;
    }
  
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/users/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        console.log(result);
        setError(result.error);
        return;
      }
  
      if (data.role === "member") {
        navigate('/questionnaire');
      } else {
        navigate('/therapist', {state: data});
      }
  
      setSucces("Account created successfully");
  
      setData({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "member" // default role
      });
  
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-heading">Register</h1>

        <div className="input-group">
          <label className="input-label" htmlFor="name">Name</label>
          <input 
            className="input-field" 
            type="text" 
            id="name" 
            value={data.name} 
            onChange={handleChange} 
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="surname">Surname</label>
          <input 
            className="input-field" 
            type="text" 
            id="surname" 
            value={data.surname} 
            onChange={handleChange} 
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="email">Email</label>
          <input 
            className="input-field" 
            type="email" 
            id="email" 
            value={data.email} 
            onChange={handleChange} 
            inputMode="email"
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="password">Password</label>
          <input 
            className="input-field" 
            type="password" 
            id="password" 
            value={data.password} 
            onChange={handleChange} 
          />
        </div>

        <div className="role-selection-group">
          <p className="role-label">Register as:</p>
          <div className="role-options">
            <label className="role-option">
              <input  
                type="radio"
                name="role"
                value="member"
                checked={data.role === "member"}
                onChange={handleChange}
              />
              <span>Member</span>
            </label>
            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="therapist"
                checked={data.role === "therapist"}
                onChange={handleChange}
              />
              <span>Therapist</span>
            </label>
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="register-button"
          sx={{
            backgroundColor: 'var(--primary-color)',
            border: 'solid 1px var(--primary-color)',
            padding: '12px 24px',
            width: "100%",
            maxWidth: '300px',
            fontSize: '16px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'var(--primary-dark)',
            },
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            margin: '20px 0',
            textTransform: 'none'
          }}
        >
          Register
        </Button>

        {error && <p className='error-message'>{error}</p>}
        {succes && <p className="success-message">{succes}</p>}

        <p className="login-link">
          Already have an account? <Link to="/login">Log in here!</Link>
        </p>
      </form>
    </div>
  );
}