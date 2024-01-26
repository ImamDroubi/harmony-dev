import React from 'react'
import "./auth-buttons.scss";
import { Link } from 'react-router-dom';
export default function AuthButtons() {
  

  return (
    <div className="auth-buttons">
      {/* <a onClick={handleLogin}>Sign in</a> */}
      <Link to={"/login"}>Sign in</Link>
      <Link to={"/register"}>Join Now</Link>
      
    </div>
  )
}
