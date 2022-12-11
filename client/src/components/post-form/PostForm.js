import React, { useState } from 'react'

const PostForm = ({ post, onChangeHandler, onSubmitHandler, error }) => {
  const [tagList, setTagList] = useState([])
  const [tagError, setTagError] = useState('')
  const [tag, setTag] = useState('')
  const addSubmitTag = (e) => {
    e.preventDefault()
    if (!tag) {
      setTagError('tag must not be empty.')
    } else {
      setTagError('')
      setTagList([...tagList, tag])
      setTag('')
    }
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="description"
          name="description"
          value={post.description}
          onChange={onChangeHandler}
        />
      </form>
      <form onSubmit={addSubmitTag}>
        {tagError && <label htmlFor="tag">{tagError}</label>}
        <input
          type="text"
          placeholder="add tags"
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button type="submit">add tag</button>
      </form>
      {tagList.map((tag, idx) => (
        <div key={idx}>{tag}</div>
      ))}
    </div>
  )
}

export default PostForm
