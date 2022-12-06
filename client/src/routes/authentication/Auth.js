import React, { useState, useEffect } from 'react'
import SignIn from '../../components/Sign-In/SignIn'
import SignUp from '../../components/Sign-Up/SignUp'
import './auth.css'

import { getRedirectResult } from 'firebase/auth'
import { auth, createUserDocumentFromAuth } from '../../utils/firebase.utils'

const Auth = () => {
  useEffect(() => {
    const result = async () => {
      const response = await getRedirectResult(auth)
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user)
        console.log(response)
      }
    }
    result()
  }, [])
  return (
    <div className="auth__container">
      <SignUp />
      <SignIn />
    </div>
  )
}

export default Auth
