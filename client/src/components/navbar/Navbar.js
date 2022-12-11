import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="navbar__logo">
          RateMy<span>DeskSetup</span>
        </h1>
      </Link>
      {currentUser ? (
        <Link to="/dashboard/myPost" className="redirect">
          <h4 className="sign-in-btn">Dashboard</h4>
        </Link>
      ) : (
        <Link to="/auth">
          <h4 className="sign-in-btn">Sign In</h4>
        </Link>
      )}
    </div>
  )
}

export default Navbar
