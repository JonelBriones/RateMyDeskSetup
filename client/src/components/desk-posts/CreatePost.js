import React, { useState } from 'react'
import PostForm from './PostForm'

const CreatePost = () => {
  const [post, setPost] = useState({
    mainPicture: '',
    pictures: [],
    id: Math.floor(Math.random() * 100000),
    // author: username,
  })
  return (
    <div>
      {/* <h1>Hello {username}</h1> */}
      <PostForm post={post} />
    </div>
  )
}

export default CreatePost
