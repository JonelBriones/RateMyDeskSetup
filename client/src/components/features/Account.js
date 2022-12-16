import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, storage, auth } from '../../utils/firebase.utils'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import './account.css'
const Account = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [currentUserData, setCurrentUserData] = useState({})
  const storage = getStorage()
  const [imageUpload, setImageUpload] = useState('')
  const [profileImage, setProfileImage] = useState('')

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
  console.log(currentUserData)
  // useEffect(() => {
  //   const uploadFile = () => {
  //     const name = new Date().getTime() + profileImage.name
  //     console.log(name)
  //     const storageRef = ref(storage, name)

  //     const uploadTask = uploadBytesResumable(storageRef, profileImage)

  //     uploadTask.on(
  //       'state_changed',
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         console.log('Upload is ' + progress + '% done')
  //         switch (snapshot.state) {
  //           case 'paused':
  //             console.log('Upload is paused')
  //             break
  //           case 'running':
  //             console.log('Upload is running')
  //             break
  //           default:
  //             break
  //         }
  //       },
  //       (error) => {},
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           console.log('File available at', downloadURL)
  //           setCurrentUserData((prev) => ({
  //             ...currentUserData,
  //             profileImg: downloadURL,
  //           }))
  //         })
  //       }
  //     )
  //   }
  //   profileImage && uploadFile()
  // }, [profileImage])

  const uploadImage = async () => {
    const name = new Date().getTime() + profileImage.name
    console.log(name)
    const storageRef = ref(storage, name)

    const uploadTask = uploadBytesResumable(storageRef, profileImage)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          setCurrentUserData((prev) => ({
            ...currentUserData,
            profileImg: downloadURL,
          }))
        })
      }
    )
  }
  return (
    <div className="account">
      <ul>
        <li>Display Name: {currentUserData.displayName}</li>
        <li>Email: {currentUserData.email}</li>
        <li>
          {/* <img
            src={
              currentUserData.profileImg
                ? currentUserData.profileImg
                : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
            }
            alt="profile-img"
            className="profile-img"
          /> */}
          <form className="profile__edit">
            <img
              src={
                currentUserData.profileImg
                  ? currentUserData.profileImg
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt="profile-img"
              className="profile-img"
            />
            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </form>
        </li>
      </ul>
      {/* <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
      <button onClick={uploadImage}>CHOOSE IMAGE</button> */}
      {/* <form action="">
        <img
          src={
            profileImage
              ? URL.createObjectURL(profileImage)
              : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
          }
          alt="profile-img"
        />
        <input
          type="file"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
        <input type="text" placeholder={currentUserData.displayName} />
      </form> */}
    </div>
  )
}

export default Account
