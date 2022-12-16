import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db, auth } from '../../utils/firebase.utils'
import './signUp.css'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
const defaultUserField = {
  profileImg: '',
  displayName: '',
  email: '',
  password: '',
}
const SignUp = () => {
  const navigate = useNavigate()
  const [error, setError] = useState({
    email: '',
    password: '',
  })
  const [profileImage, setProfileImage] = useState('')
  const [user, setUser] = useState(defaultUserField)
  const [confirmPassword, setConfirmPassword] = useState('')
  const storage = getStorage()
  const { profileImg, displayName, email, password } = user

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (user.password !== confirmPassword) {
      setError({
        password: 'passwords do not match!',
      })
      console.log(error)
      return
    }
    console.log('form submit', user)
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log('USER DATA', user)

      await setDoc(doc(db, 'users', res.user.uid), {
        ...user,
        timeStamp: serverTimestamp(),
      })
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
  useEffect(() => {
    const uploadImage = async () => {
      const name = new Date().getTime() + profileImage.name
      console.log('IMAGE NAME', name)
      const storageRef = ref(storage, name)

      const uploadTask = uploadBytesResumable(storageRef, profileImage)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            setUser((prev) => ({
              ...user,
              profileImg: downloadURL,
            }))
          })
        }
      )
    }
    profileImage && uploadImage()
  }, [profileImage])
  const chooseFile = (file) => {
    setProfileImage(file)
  }
  return (
    <div>
      <h1>Create an account!</h1>
      <form onSubmit={onSubmitHandler} className="sign-in__form">
        <div className="profile-pic">
          <img
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
            }
            alt="profile-img"
            className="profile-img"
          />
          <div>
            <input
              type="file"
              onChange={(e) => chooseFile(e.target.files[0])}
              name="file"
              className="choose-file"
            />
          </div>
        </div>
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
          onChange={(e) => setConfirmPassword(e.target.value)}
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
