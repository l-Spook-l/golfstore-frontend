import React, { useContext, useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { deleteProductFromBasket, fetchListProductsBasket, updateQuantityProductInBasket } from "../../http/productAPI";
import { NavLink, useNavigate } from "react-router-dom";
import { CHECKOUT_ROUTE, PRODUCT_ROUTE } from "../../utils/consts";
import style from "./Basket.module.css"

const Basket = observer(() => {
  const { user } = useContext(Context);

  const navigate = useNavigate();

  const [changeQuantity, setChangeQuantity] = useState(true)
  
  useEffect(() => {
    fetchListProductsBasket(user.basket.id).then((products) => {
      user.setBasket({id: user.basket.id , product: products.results})
    })
  },[changeQuantity])

  const deleteProduct = (basketId, productId) => {
    deleteProductFromBasket(basketId, productId)
    const basket = user.basket.product.filter(item => item.product.id !== productId)
    user.setBasket({id: basketId , product: basket})
  }

  const totalPrice = user.basket.product.reduce((acc, el) => {
    return acc + (el.product.price * el.quantity)
  }, 0);

  const productSlug = (productName) => 
    {
      const name = productName.toLowerCase().replace(/\'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return name
    } 
    
  const changeQuantityPlus = (basketId, productId, quantity) => {
    updateQuantityProductInBasket(basketId, productId, quantity)
    setChangeQuantity(!changeQuantity)
  }
  
  const changeQuantityMinus = (basketId, productId, quantity) => {
    updateQuantityProductInBasket(basketId, productId, quantity)
    setChangeQuantity(!changeQuantity)
  }

  return (
    <Container className={style.forContainer}>
      <h2>My Basket</h2>
      {user.basket.product.length > 0 
        ? 
        <div className={style.mainBlock}>
          <div className={style.productsBlock}>
          {user.basket.product.map((el) => 
          <div className={style.productBlock} key={el.product.id}>
            <div >
              <Image className={style.image} src={el.product.photos[0]['image']}
              onClick={() => navigate(`${PRODUCT_ROUTE}/${productSlug(el.product.name)}`)}
              />
            </div>
            <div className="ms-3">
              <h5>{el.product.name}</h5>
              <div className={style.quantityBlock}>
                Quantity
                <div className="">
                  <button className={style.buttonChangeQuantity} disabled={el.quantity === 1} onClick={() => changeQuantityMinus(user.basket.id, el.product.id, el.quantity - 1)}>-</button>
                  {el.quantity}
                  <button className={style.buttonChangeQuantity} onClick={() => changeQuantityPlus(user.basket.id, el.product.id, el.quantity + 1)}>+</button>
                </div>
              </div>
              <p>{el.product.price} $</p>
            </div>
            <div>
              <button onClick={() => deleteProduct(user.basket.id, el.product.id)} className={style.deleteButton}>Delete</button>
            </div>
          </div>
          )}  
          </div>
          <div className={style.orderBlock}>
            <h4>Total amount</h4>
            <p className={style.totalPrice}>{totalPrice} $</p>
            <NavLink className={style.buttonOrder} to={CHECKOUT_ROUTE}>Place Order</NavLink>
          </div>
        </div>
        : <h4 className="mt-5 text-muted">Basket is empty </h4>
        }
    </Container>
  );
});

export default Basket;
