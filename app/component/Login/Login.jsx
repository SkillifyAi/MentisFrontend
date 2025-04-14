import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate} from "react-router"
import LoginGoogle from './LoginGoogle';
import {Fade, Box, CircularProgress, Typography} from '@mui/material'

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const [succes, setSucces] = useState("")
  const [forgotPassword, setForgotPassword] = useState(false)

  const toggleLoading = (load) => {
    setLoading(load)
  }

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  let navigate = useNavigate()

  const handleLogIn = async () => {
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
    } finally {
      toggleLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!data.email) {
      setError("Please provide an email.");
      toggleLoading(false)
      return;
    }
  
    try {
      // Replace this URL with the actual backend URL for login
      const response = await fetch("http://localhost:5000/users/forgot-password", {
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
        setSucces("Email sent")
      } else {
        console.log(result);
        if (typeof result.error === 'string')
          setError(result.error || "Couldn't send email.")
        else 
          setError("Couldn't send email.");
        toggleLoading(false)
      }
    } catch (error) {
      console.log(error);
      toggleLoading(false)
      setError("Network error: Please try again later.");
    } finally {
      toggleLoading(false)
    }
  }
  // Handle form submission and communicate with the backend
  const handleSubmit = async (e) => {
    
    toggleLoading(true)
    e.preventDefault(); // Prevent the default form submission behavior

    if(!forgotPassword)
      handleLogIn()
    else 
      handleForgotPassword()  
  };

  const handleBackToLogin = () => {
    if(forgotPassword) {
      setForgotPassword(false)
    }
  }

  return (
    <div className="loginContainer">  {/* Apply class to the container */}
      {!loading && <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="loginHeading">{!forgotPassword ? "Log In" : "Forgot password"}</h1>
        {forgotPassword && <Link className = "registerLink" to = "/sign-up" style={{color: 'var(--primary-color)', marginTop: '-30px', marginBottom: '20px'}} >Don't have an account? Sign up for free</Link>}
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
        {!forgotPassword && <div className="inputGroup">
          <label className="loginLabel" htmlFor="password">Password</label>
          <input
            className="loginInput"
            type="password"
            id="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>}

        <Button
          variant="contained"
          color="primary"
          sx={{
            transition: "all 0.2s ease",
            backgroundColor: 'var(--primary-color)',
            border: 'solid 1px var(--primary-color)',
            padding: '10px 20px',
            width: "90%",
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
          {!forgotPassword ? "Log In" : "Send me an email"}
        </Button>
        {!forgotPassword && <span onClick = {() => setForgotPassword(true)} className="forgot-password">Forgot password?</span>}
        {error && <p className='error'>{error}</p>}
        {succes && <p className = 'succes'>{succes}</p>}
       {!forgotPassword && <div className='or-section'>
            <span></span>
            <p>OR</p>
            <span></span> 
        </div>}
          {!forgotPassword && <LoginGoogle loading = {loading} toggleLoading={toggleLoading}/> }
        <Link onClick = {handleBackToLogin} to={!forgotPassword ? "/sign-up" : "/login"} className='registerLink'>{!forgotPassword ? "Don't have an account? Sign up for free!" : "Go back to login"}</Link>
      </form> }

        <Fade in={loading} timeout={200}>
            <Box sx={{
              position: 'absolute', // Ensure the spinner doesn't take up any space in the document flow
              top: '50%',           // Position it vertically in the center
              left: '50%',          // Position it horizontally in the center
              transform: 'translate(-50%,  -50% )', // Center it exactly
              textAlign: 'center',
              zIndex: 1000,         // Make sure the spinner appears above other content
            }}>
              <CircularProgress size={100} sx={{ color: 'primary.main', marginBottom: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Loading, please wait...
              </Typography>
            </Box>
          </Fade>
    </div>
  );
}