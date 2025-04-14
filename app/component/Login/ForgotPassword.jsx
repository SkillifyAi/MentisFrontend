import React from 'react'

export default function ForgotPassword() {
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
          Log In
        </Button>
        <span className="forgot-password">Forgot password?</span>
        {error && <p className='error'>{error}</p>}
        {succes && <p className = 'succes'>{succes}</p>}
        <div className='or-section'>
            <span></span>
            <p>OR</p>
            <span></span> 
        </div>
          <LoginGoogle loading = {loading} toggleLoading={toggleLoading}/> 
        <Link to="/sign-up" className='registerLink'>Don't have an account? Sign up for free!</Link>
      </form> 
      </div>
  )
}
