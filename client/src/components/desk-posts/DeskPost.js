import React, { useEffect, useState } from 'react'
import './deskPost.css'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../utils/firebase.utils'
const DeskPost = () => {
  const [deskPost, setDeskPost] = useState([
    {
      createdBy: 'Jonel Briones',
      description: 'minimal',
      id: 1,
      likes: 4,
      tags: ['minimal'],
      picture:
        'https://d2y9w8c9.rocketcdn.me/wp-content/uploads/2019/06/gaming-desk-setup-3.jpeg',
    },
    {
      createdBy: 'Joshua Erive',
      description: 'productivity',
      id: 2,
      likes: 10,
      tags: ['productivity'],
      picture:
        'https://www.vivandtimhome.com/wp-content/uploads/2020/06/Modern-Desk-Setup-Work-Station-15.jpg',
    },
    {
      createdBy: 'Paul Cao',
      description: 'gaming',
      id: 3,
      likes: 2,
      tags: ['gaming'],
      picture:
        'https://www.minimaldesksetups.com/wp-content/uploads/2022/11/293302129_1066920367364912_1474394010024187611_n-768x960.jpg',
    },
  ])
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      let list = []
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'))
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
          console.log(list)
          setPosts(list)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  console.log(posts)
  return (
    <div className="post p2">
      <h1>Most Viewed Setups</h1>
      <div className="post__container">
        {posts.map(({ id, createdBy, img }) => (
          <div key={id} className="post__card">
            <div className="post__header post__img">
              {img ? (
                <img src={img} alt="post" />
              ) : (
                <img
                  src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  alt="post"
                />
              )}
            </div>
            <div className="post__footer">
              <button className="btn">View</button>
              <span> Posted by {createdBy}</span>
              <span> {id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeskPost
