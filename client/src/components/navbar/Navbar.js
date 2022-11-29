import React, { useState } from 'react'
import SignIn from '../authentication/SignIn'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const [toggleAuth, setToggleAuth] = useState(false)
  const [loggedUser, setLoggedUser] = useState({})
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (user.password === user.confirmPassword) {
      console.log('LOGIN SUCCESS', user)
      setLoggedUser(user)
      setUser({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      setToggleAuth(false)
    }
  }
  const onChangeHandler = (e) => {
    const newObject = { ...user }
    newObject[e.target.name] = e.target.value
    setUser(newObject)
  }

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="navbar__logo">
          RateMy<span>DeskSetup</span>
        </h1>
      </Link>
      {loggedUser.username ? (
        <Link to="/dashboard/myPost" className="redirect">
          <h4 className="sign-in-btn">Dashboard</h4>
        </Link>
      ) : (
        <h4 onClick={() => setToggleAuth(!toggleAuth)} className="sign-in-btn">
          Sign In
        </h4>
      )}
      {toggleAuth && (
        <>
          <SignIn
            toggleAuth={toggleAuth}
            setToggleAuth={setToggleAuth}
            user={user}
            onChangeHandler={onChangeHandler}
            onSubmitHandler={onSubmitHandler}
          />
        </>
      )}
    </div>
  )
}

export default Navbar
