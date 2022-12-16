import React, { useEffect, useState } from 'react'
import PostForm from '../post-form/PostForm'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../utils/firebase.utils'
import { doc, getDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
const CreatePost = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [currentUserData, setCurrentUserData] = useState({})
  const defaultForm = {
    description: '',
    tags: [],
    createdBy: '',
    timeStamp: serverTimestamp(),
    likes: 0,
    img: '',
  }
  const [post, setPost] = useState(defaultForm)
  const [error, setError] = useState({})
  const [tagList, setTagList] = useState([])
  const [tagError, setTagError] = useState('')
  const [tag, setTag] = useState('')
  const [image, setImage] = useState('')
  const storage = getStorage()

  useEffect(() => {
    const getUserData = async () => {
      try {
        const ref = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(ref)
        if (docSnap.id === currentUser.uid) {
          setCurrentUserData(docSnap.data())
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const { description, createdBy, timeStamp, likes } = post
      const docRef = await addDoc(collection(db, 'posts'), {
        ...post,
        createdBy: currentUserData.displayName,
        tags: tagList,
      })
      console.log(docRef)

      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }
  useEffect(() => {
    const uploadImage = async () => {
      const name = new Date().getTime() + image.name
      console.log('IMAGE NAME', name)
      const storageRef = ref(storage, name)

      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            setPost((prev) => ({
              ...post,
              img: downloadURL,
            }))
          })
        }
      )
    }
    image && uploadImage()
  }, [image])

  const onChangeHandler = (e) => {
    let newPost = { ...post }
    newPost[e.target.name] = e.target.value
    setPost(newPost)
  }

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
  const onChangeHandlerTag = (e) => {
    setTag(e.target.value)
  }
  const chooseFile = (file) => {
    setImage(file)
    console.log(file)
  }
  return (
    <div>
      <h1>Create Post</h1>
      <PostForm
        post={post}
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        error={error}
        addSubmitTag={addSubmitTag}
        tagList={tagList}
        tagError={tagError}
        tag={tag}
        onChangeHandlerTag={onChangeHandlerTag}
        setImage={setImage}
        image={image}
        chooseFile={chooseFile}
      />
    </div>
  )
}

export default CreatePost
