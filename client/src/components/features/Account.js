import React from 'react'
import { useSelector } from 'react-redux'

const Account = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  console.log(currentUser)
  console.log(currentUser.additionalInformation)
  return (
    <div>
      <span>{currentUser.email}</span>
      {/* <span>{currentUser.additionalInformation}</span> */}
    </div>
  )
}

export default Account
