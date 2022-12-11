import React, { useEffect, useState } from 'react'
import {
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase.utils'

import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const defaultUserField = {
  email: '',
  password: '',
}
const SignIn = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()
  const [error, setError] = useState({
    email: '',
    password: '',
  })
  const [user, setUser] = useState(defaultUserField)
  const { email, password } = user
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log('loggin submit', user)
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(response)
      navigate('/')
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError({
          email: 'Email is invalid.',
        })
      }
      if (error.code === 'auth/wrong-password') {
        setError({
          password: 'Password is invalid',
        })
      }
    }
  }
  const onChangeHandler = (e) => {
    const newObject = { ...user }
    newObject[e.target.name] = e.target.value
    setUser(newObject)
  }
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])
  return (
    <div>
      <h1>Already have an account?</h1>
      <form onSubmit={onSubmitHandler} className="sign-in__form">
        {error.email && <label htmlFor="email">{error.email}</label>}
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={onChangeHandler}
          required
        />
        {error.password && <label htmlFor="email">{error.password}</label>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={onChangeHandler}
          required
        />
        <button type="submit" className="sign-in btn">
          Sign in
        </button>
      </form>
      <button onClick={signInWithGoogleRedirect} className="sign-in btn google">
        <FcGoogle /> Continue with Google
      </button>
    </div>
  )
}

export default SignIn
