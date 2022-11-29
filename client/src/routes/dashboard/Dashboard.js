import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Link, useParams } from 'react-router-dom'
import './dashboard.css'
import { AiFillEdit } from 'react-icons/ai'
import { RiAccountCircleFill } from 'react-icons/ri'
import Account from '../../components/features/Account'
import MyPosts from '../../components/features/MyPosts'
const Dashboard = () => {
  const params = useParams()
  const { feature } = params
  const [toggleFeature, setToggleFeature] = useState('')
  const features = ['myPost', 'account']
  const displayFeature = () => {
    if (toggleFeature === 'account') return <Account />
    if (toggleFeature === 'myPost') return <MyPosts />
  }
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
            <Link to="/dashboard/account">
              <li onClick={() => setToggleFeature('account')}>
                <RiAccountCircleFill size={24} /> Account
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
