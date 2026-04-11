import React from 'react'
import { Link } from "react-router-dom";

function Nav() {
  return (
     <nav>
      <h3 style={{ color: "white" }}>Loanify App</h3>

      <div>
        <Link to="/">Home</Link>
        <Link to="/apply">Apply</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  )
}

export default Nav
