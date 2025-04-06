import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate} from "react-router"
import LoginGoogle from './LoginGoogle';

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [succes, setSucces] = useState("")

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  let navigate = useNavigate()

  // Handle form submission and communicate with the backend
  const handleSubmit = async (e) => {
    
    
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation check
    if (!data.email || !data.password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      // Replace this URL with the actual backend URL for login
      const response = await fetch("http://localhost:5000/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log(response);
      
      if (response.ok) {
        // Handle successful login, maybe redirect or store tokens
        setError("")
        setSucces("Login worked")
        navigate("/dashboard")
      } else {
        console.log(result);
        if (typeof result.error === 'string')
          setError(result.error || "An error occurred during login.")
        else 
          setError("An error occurred during login.");
      }
    } catch (error) {
      console.log(error);
      
      setError("Network error: Please try again later.");
    }
  };

  return (
    <div className="loginContainer">  {/* Apply class to the container */}
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="loginHeading">Log In</h1>
        <div className="inputGroup">
          <label className="loginLabel" htmlFor="email">Email</label>
          <input
            className="loginInput"
            type="text"
            id="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="inputGroup">
          <label className="loginLabel" htmlFor="password">Password</label>
          <input
            className="loginInput"
            type="password"
            id="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          sx={{
            transition: "all 0.2s ease",
            backgroundColor: 'var(--primary-color)',
            border: 'solid 1px var(--primary-color)',
            padding: '10px 20px',
            width: "70%",
            fontSize: '18px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'var(--primary-color)', // Hover color
              filter: 'brightness(1.2)'
            },
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Box shadow
          }}
          type="submit" // Ensure this is the submit button
        >
          Log In
        </Button>
        
        {error && <p className='error'>{error}</p>}
        {succes && <p className = 'succes'>{succes}</p>}
        <div className='or-section'>
            <span></span>
            <p>OR</p>
            <span></span> 
        </div>
          <LoginGoogle /> 
        <Link to="/sign-up" className='registerLink'>Don't have an account? Sign up for free!</Link>

      </form>
    </div>
  );
}