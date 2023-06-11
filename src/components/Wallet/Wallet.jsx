import React, { useContext, useState } from 'react'
import CardForm from '../Forms/CardForm/CardForm'
import { Container } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import { updateUserCardNumber } from '../../http/userAPI'
import style from "./Wallet.module.css"

const Wallet = observer(() => {
  const { user } = useContext(Context)
  console.log('wqeeeeeeeeeeeeeeeeee', user.user.card_number)

  const [cardNumber, setCardNumber] = useState(user.user.card_number)

  const updateCardNumber = (card) => {
    updateUserCardNumber(parseInt(card.replace(/\s/g, "")))
    setCardNumber(card)
  };

  const deleteCardNumber = () => {
    updateUserCardNumber(null)
    setCardNumber(null)
  }
  console.log('eqwewq', cardNumber, typeof(cardNumber), String(cardNumber), typeof(cardNumber))
  

  return (
    <Container className={style.forContainer} >
      <h1>My wallet</h1>
      {cardNumber === null
      ? <CardForm card={updateCardNumber}/>
      : 
        <div className={style.card}>
          <p className={style.cardNumber}>{`${String(cardNumber).replace(/.(?=.{4})/g, "*")}`}</p>
          <button className={style.deleteCard} onClick={() => deleteCardNumber()}>Delete card</button>
        </div>
      }
      
    </Container>
  )
})

export default Wallet