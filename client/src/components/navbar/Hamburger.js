import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
const Hamburger = () => {
  return (
    <div>
      <div className="menu-wrap">
        <input type="checkbox" className="toggler" />
        <div className="hamburger">
          <div></div>
        </div>
        <div className="menu">
          <div>
            <div>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/explore">Explore</a>
                </li>
                <li>
                  <a href="/auth">Sign In</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hamburger
