import React from 'react'
import CardForm from '../UI/CardForm/CardForm'
import { Container } from 'react-bootstrap'

const Wallet = () => {
  return (
    <Container style={{paddingTop: '63px'}} >
      <h1>My wallet</h1>
      <CardForm/>
    </Container>
  )
}

export default Wallet