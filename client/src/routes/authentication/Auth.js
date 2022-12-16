import React, { useState, useEffect } from 'react'
import SignIn from '../../components/Sign-In/SignIn'
import SignUp from '../../components/Sign-Up/SignUp'
import './auth.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])
  return (
    <div className="auth__container">
      <SignUp />
      <SignIn />
    </div>
  )
}

export default Auth
