import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase.utils'
const defaultUserField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const SignUp = () => {
  const navigate = useNavigate()
  const [error, setError] = useState({
    email: '',
    password: '',
  })
  const [user, setUser] = useState(defaultUserField)
  const { displayName, email, password, confirmPassword } = user
  const onSubmitHandler = async (e) => {
    console.log('form submit', user)
    e.preventDefault()
    if (user.password !== user.confirmPassword) {
      setError({
        password: 'passwords do not match!',
      })
      console.log(error)
      return
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      console.log(user)
      await createUserDocumentFromAuth(user, { displayName })
      navigate('/')
    } catch (error) {
      console.log('problem with creating user', error)
      if (error.code === 'auth/email-already-in-use') {
        setError({
          email: 'Email is already in use.',
        })
      }
      if (error.code === 'auth/invalid-email') {
        setError({
          email: 'Email is invalid.',
        })
      }
      if (error.code === 'auth/weak-password') {
        setError({
          password: 'Password should be at least 6 characters.',
        })
      }
    }
  }
  const onChangeHandler = (e) => {
    const newObject = { ...user }
    newObject[e.target.name] = e.target.value
    setUser(newObject)
  }
  return (
    <div>
      <h1>Create an account!</h1>
      <form onSubmit={onSubmitHandler} className="sign-in__form">
        <input
          type="text"
          placeholder="Display Name"
          name="displayName"
          value={displayName}
          onChange={onChangeHandler}
          required
        />
        {error.email && <label htmlFor="email">{error.email}</label>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChangeHandler}
          required
        />

        {error.password && <label htmlFor="password">{error.password}</label>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChangeHandler}
          required
        />
        {error.password && (
          <label htmlFor="confirmPassword">{error.password}</label>
        )}

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeHandler}
          required
        />
        <button type="submit" className="sign-in btn">
          Sign in
        </button>
      </form>
    </div>
  )
}

export default SignUp
