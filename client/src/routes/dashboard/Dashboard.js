import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './dashboard.css'
import { AiFillEdit } from 'react-icons/ai'
import { RiAccountCircleFill } from 'react-icons/ri'
import { CgLogOut } from 'react-icons/cg'
import Account from '../../components/features/Account'
import MyPosts from '../../components/features/MyPosts'

import { signOutUser } from '../../utils/firebase.utils'
import CreatePost from '../../components/create-post/CreatePost'
const Dashboard = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { feature } = params
  const [loggedUser, setLoggedUser] = useState('')
  const [toggleFeature, setToggleFeature] = useState('')
  const features = ['myPost', 'account']
  const displayFeature = () => {
    if (toggleFeature === 'account') return <Account />
    if (toggleFeature === 'myPost') return <MyPosts />
    if (toggleFeature === 'createPost') return <CreatePost />
  }
  useEffect(() => {
    if (loggedUser.username === '') {
      navigate('/')
      console.log('returning to home')
    }
  }, [])

  return (
    <div>
      <div className="dashboard__container">
        <div className="dashboard__features">
          <ul>
            <Link to="/dashboard/myPost">
              <li
                onClick={() => setToggleFeature('myPost')}
                className="dashboard__myPost">
                <AiFillEdit size={24} /> My Posts
              </li>
            </Link>
            <Link to="/dashboard/createPost">
              <li onClick={() => setToggleFeature('createPost')}>
                <RiAccountCircleFill size={24} /> Create Post
              </li>
            </Link>
            <Link to="/dashboard/account">
              <li onClick={() => setToggleFeature('account')}>
                <RiAccountCircleFill size={24} /> Account
              </li>
            </Link>
            <Link to="/">
              <li onClick={signOutUser}>
                <CgLogOut size={24} /> Log out
              </li>
            </Link>
          </ul>
        </div>
        <div className="dashboard__display">{displayFeature()}</div>
      </div>
    </div>
  )
}

export default Dashboard
