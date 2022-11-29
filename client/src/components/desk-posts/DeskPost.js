import React, { useState } from 'react'
import './deskPost.css'
const DeskPost = () => {
  const [deskPost, setDeskPost] = useState([
    {
      categories: 'minimal',
      id: 1,
      reviews: [],
      author: 'Jonel Briones',
      picture:
        'https://d2y9w8c9.rocketcdn.me/wp-content/uploads/2019/06/gaming-desk-setup-3.jpeg',
    },
    {
      categories: 'productivity',
      id: 2,
      reviews: [],
      author: 'Joshua Erive',
      picture:
        'https://www.vivandtimhome.com/wp-content/uploads/2020/06/Modern-Desk-Setup-Work-Station-15.jpg',
    },
    {
      categories: 'gaming',
      id: 3,
      reviews: [],
      author: 'Paul Cao',
      picture:
        'https://www.minimaldesksetups.com/wp-content/uploads/2022/11/293302129_1066920367364912_1474394010024187611_n-768x960.jpg',
    },
  ])
  return (
    <div className="post p2">
      <h1>Most Viewed Setups</h1>
      <div className="post__container">
        {deskPost.map(({ categories, id, reviews, author, picture }) => (
          <div key={id} className="post__card">
            <div className="post__header post__img">
              <img src={picture} alt="post" />
            </div>
            <div className="post__footer">
              <button className="btn">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeskPost
