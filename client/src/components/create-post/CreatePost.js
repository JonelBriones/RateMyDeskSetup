import React, { useState } from 'react'
import PostForm from '../post-form/PostForm'

const defaultForm = {
  description: '',
  tags: [],
  createdBy: '',
  date: '',
  likes: '',
}
const CreatePost = () => {
  const [post, setPost] = useState(defaultForm)
  const [error, setError] = useState({})
  const onSubmitHandler = (e) => {
    e.preventDefault()
  }
  const onChangeHandler = (e) => {
    let newPost = { ...post }
    newPost.e.name = e.target.value
    setPost(newPost)
  }
  return (
    <div>
      <h1>Create Post</h1>
      <PostForm
        post={post}
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        error={error}
      />
    </div>
  )
}

export default CreatePost
