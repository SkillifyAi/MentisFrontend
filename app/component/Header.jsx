import React from 'react'
import { Link } from 'react-router';
import logo from "../assets/logo.png"

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src = {logo} />
      </div>
      <nav className="nav">
        <ul>
          <li><a href="#about">About</a></li>
          <li>
            <Link to="login"><button className="auth-btn">Log In / Sign Up</button></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
