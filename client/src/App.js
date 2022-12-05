import { useEffect } from 'react'
import './App.css'
import Home from './routes/home/Home'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './routes/dashboard/Dashboard'
import Navbar from './components/navbar/Navbar'
import { setCurrentUser } from './store/user/user.action'
import { useDispatch } from 'react-redux'
// import {
//   onAuthStateChangedListener,createUserDocumentFromAuth
// } from '../utils/firebase/firebase.utils'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user)
    //   }
    //   dispatch(setCurrentUser(user))
    // })
    // return unsubscribe
  }, [dispatch])
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Dashboard />} path="/dashboard/" />
        <Route element={<Dashboard />} path="/dashboard/:feature" />
      </Routes>
    </div>
  )
}

export default App
