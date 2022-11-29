import React from 'react'
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
              <ul className="navbar-link">
                <li>
                  <a href="" className="nav-links">
                    Home
                  </a>
                </li>
                <li>
                  <a href="" className="nav-links">
                    Explore
                  </a>
                </li>
                <li>
                  <a href="" className="nav-links">
                    Sign In
                  </a>
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
