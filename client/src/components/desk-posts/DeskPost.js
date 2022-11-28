import React, { useState } from 'react'

const DeskPost = () => {
  const [deskPost, setDeskPost] = useState([
    { categories: 'minimal', id: 1, reviews: [], author: 'Jonel Briones' },
    { categories: 'productivity', id: 2, reviews: [], author: 'Joshua Erive' },
    { categories: 'gaming', id: 3, reviews: [], author: 'Paul Cao' },
  ])
  return (
    <div>
      <h1>Most Viewed Setups</h1>
      <div>
        {deskPost.map(({ categories, id, reviews, author }) => (
          <div key={id} className="post__Card">
            <h1>By{author}</h1>
            <span>{categories}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeskPost
