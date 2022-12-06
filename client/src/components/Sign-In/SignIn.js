import React, { useState } from 'react'
import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase.utils'

import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
const SignIn = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (user.password && user.email) {
      console.log('LOGIN SUCCESS', user)
      setUser({
        email: '',
        password: '',
      })
    }
  }
  const onChangeHandler = (e) => {
    const newObject = { ...user }
    newObject[e.target.name] = e.target.value
    setUser(newObject)
  }
  return (
    <div>
      <h1>Already have an account?</h1>
      <form onSubmit={onSubmitHandler} className="sign-in__form">
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
        <button type="submit" className="sign-in btn">
          Sign in
        </button>
        <button
          onClick={signInWithGoogleRedirect}
          className="sign-in btn google">
          <FcGoogle /> Continue with Google
        </button>
      </form>
    </div>
  )
}

export default SignIn
