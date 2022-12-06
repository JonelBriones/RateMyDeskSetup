import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { setCurrentUser } from './store/user/user.action'
import './App.css'
import Home from './routes/home/Home'
import Dashboard from './routes/dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'
import Auth from './routes/authentication/Auth'
import Hamburger from './components/navbar/Hamburger'
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from './utils/firebase.utils'

function App() {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocumentFromAuth(user)
  //     }
  //     dispatch(setCurrentUser(user))
  //   })
  //   return unsubscribe
  // }, [dispatch])
  return (
    <div className="App">
      <Navbar />
      <Hamburger />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Auth />} path="/auth" />
        <Route element={<Dashboard />} path="/dashboard/" />
        <Route element={<Dashboard />} path="/dashboard/:feature" />
      </Routes>
    </div>
  )
}

export default App
