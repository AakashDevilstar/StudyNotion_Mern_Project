import React from 'react'
import ChangePicture from './ChangePicture'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'

function Settings() {
  return (
    <div>
        <h1 className='text-richblack-5 font-medium text-3xl mb-14'>
           Edit Profile 
        </h1>
        <ChangePicture/>
        <EditProfile/>
        <DeleteAccount/>
    </div>
  )
}

export default Settings
