import React from 'react'
import { Link } from "react-router-dom";
import { FaHandHoldingUsd } from "react-icons/fa";



function Nav() {
  return (
     <nav>
      <h3 style={{ color: "white" }}>Loanify App <FaHandHoldingUsd size={50} color="#4da3ff" /> </h3>
     

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
