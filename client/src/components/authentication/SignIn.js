import React from 'react'
import './signInModal.css'
import { TiCancel } from 'react-icons/ti'
const SignIn = ({
  toggleAuth,
  setToggleAuth,
  onChangeHandler,
  onSubmitHandler,
  user,
}) => {
  return (
    <div className="modal__container">
      <div className="sign-in__modal">
        <span
          className="modal__cancel"
          onClick={() => setToggleAuth(!toggleAuth)}>
          <TiCancel size={35} style={{ color: '#fca311' }} />
        </span>
        <div className="sign-in__container">
          <h1>Sign in for full access!</h1>
          <p>Enter your email and password to unlock all features!</p>
          <form onSubmit={onSubmitHandler} className="sign-in__form">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={user.username}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={onChangeHandler}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={onChangeHandler}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={onChangeHandler}
            />
            <button type="submit" className="sign-in btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
