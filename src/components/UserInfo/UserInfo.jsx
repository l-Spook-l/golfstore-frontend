import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { Context } from '../..';

const UserInfo = () => {
  const { user } = useContext(Context);

  console.log('uesrewqrwqwqr', user)

  return (
    <Container style={{paddingTop: '63px'}} >UserInfo</Container>
  )
}

export default UserInfo