import React, { useState } from 'react'

const PostForm = ({
  post,
  onChangeHandler,
  onSubmitHandler,
  error,
  addSubmitTag,
  tagList,
  tagError,
  tag,
  onChangeHandlerTag,
  setImage,
  image,
  chooseFile,
}) => {
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <img
          src={
            image
              ? URL.createObjectURL(image)
              : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
          }
          alt="profile-img"
          className="profile-img"
        />
        <input
          type="file"
          onChange={(e) => chooseFile(e.target.files[0])}
          name="file"
          className="choose-file"
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          value={post.description}
          onChange={onChangeHandler}
        />

        {tagError && <label htmlFor="tag">{tagError}</label>}
        <input
          type="text"
          placeholder="add tags"
          name="tag"
          value={tag}
          onChange={onChangeHandlerTag}
        />
        <button onClick={addSubmitTag}>add tag</button>
        <button type="submit">Add Post</button>
      </form>
      {tagList.map((tag, idx) => (
        <div key={idx}>{tag}</div>
      ))}
    </div>
  )
}

export default PostForm
