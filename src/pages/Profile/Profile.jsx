import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../..'

const Profile = observer(() => {
  const {user} = useContext(Context)

  console.log('user', user)

  return (
    <div>
      Profile
    <h1>{user.user.username}</h1>
    <p>{user.user.id}</p>
    </div>
  )
})

export default Profile