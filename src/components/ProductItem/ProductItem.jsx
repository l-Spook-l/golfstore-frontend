import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Image } from "react-bootstrap";
import { PRODUCT_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BsCart, BsFillCartCheckFill } from "react-icons/bs";
import {
  addProductToBasket,
  addProductToWishList,
  deleteProductFromWishList,
} from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import FormLogin from "../UI/FormLogin/FormLogin";
import FormRegister from "../UI/FormRegister/FormRegister";
import style from "./ProductItem.module.css";

const ProductItem = observer(({ product }) => {
  const { user } = useContext(Context);

  const [isHovered, setIsHovered] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  const navigate = useNavigate();

  const [productOnBasket, setProductOnBasket] = useState();

  const [productOnWishList, setProductOnWishList] = useState();

  useEffect(() => {
    user.basket.product.filter((item) => item.product.id === product.id)
      .length > 0
      ? setProductOnBasket(<BsFillCartCheckFill />)
      : setProductOnBasket(<BsCart />);
    user.wishList.product.filter((item) => item.product.id === product.id)
      .length > 0
      ? setProductOnWishList(<AiTwotoneHeart />)
      : setProductOnWishList(<AiOutlineHeart />);
  }, [user.wishList.product.length, user.basket.product.length]);

  const addToWishlist = (wishListId, productId) => {
    const wishList = user.wishList.product.filter(
      (item) => item.product.id !== productId
    );
    const productInWishList =
      user.wishList.product.filter((item) => item.product.id === product.id)
        .length > 0;

    if (productInWishList) {
      deleteProductFromWishList(wishListId, productId);
      const wishList = user.wishList.product.filter(
        (item) => item.product.id !== productId
      );
      user.setWishList({ id: wishListId, product: wishList });
      setProductOnWishList(<AiOutlineHeart />);
    } else {
      const newProduct = addProductToWishList({
        wishlist: wishListId,
        product: productId,
      });

      newProduct.then((result) =>
        user.setWishList({
          id: wishListId,
          product: [
            ...wishList,
            {
              created_at: result.created_at,
              id: result.id,
              product: {
                id: product.id,
                name: product.name,
                photos: product.photos,
                price: product.price,
              },
              wishlist: result.wishlist,
            },
          ],
        })
      );
      setProductOnWishList(<AiTwotoneHeart />);
    }
  };

  const addToBasket = (basketId, productId) => {
    const basket = user.basket.product.filter(
      (item) => item.product.id !== productId
    );

    const productInCart =
      user.basket.product.filter((item) => item.product.id === product.id)
        .length > 0;

    if (productInCart) {
      navigate(`${PROFILE_ROUTE}`, {state: 'basket'});
    } else {
      const newProduct = addProductToBasket({
        basket: basketId,
        product: productId,
      });
  
      newProduct.then((result) =>
        user.setBasket({
          id: basketId,
          product: [
            ...basket,
            {
              basket: result.basket,
              id: result.id,
              product: {
                id: product.id,
                name: product.name,
                photos: product.photos,
                price: product.price,
              },
              quantity: 2,
            },
          ],
        })
      );
      setProductOnBasket(<BsFillCartCheckFill />);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleSwitchForm = () => {
    setShowLogin(!showLogin);
  };

  const [showLogin, setShowLogin] = useState(true);

  const clickLogin = () => {
    setShowModal(true);
    setShowLogin(true);
  };

  const hoverProduct = (productId) => {
    setIsHovered(true);
    setActiveProduct(productId);
  };

  return (
    <Col md={3} className="mt-3">
      <Card style={{ width: 200 }} border="light">
        <button
          className={style.butthonWishlist}
          onClick={() => {
            user.isAuth
              ? addToWishlist(user.wishList.id, product.id)
              : clickLogin();
          }}
        >
          {productOnWishList}
        </button>
        <Image
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`${PRODUCT_ROUTE}/${product.slug}`)}
          width={200}
          height={200}
          src={
            isHovered &&
            activeProduct === product.id &&
            product.photos.length > 1
              ? product.photos[1]["image"]
              : product.photos[0]["image"]
          }
          onMouseEnter={() => hoverProduct(product.id)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <div style={{ cursor: "pointer" }} onClick={() => navigate(`${PRODUCT_ROUTE}/${product.slug}`)}>
          {product.name}
        </div>
        <div className="mt-1 d-flex justify-content-between align-items-center">
          <div>{product.price} $</div>
          <div
            style={{ fontSize: "1.3rem", color: "black", cursor: 'pointer' }}
            onClick={() =>  {
              user.isAuth
                ? addToBasket(user.basket.id, product.id)
                : clickLogin()
            }}
          >
            {productOnBasket}
          </div>
        </div>
      </Card>

      {showLogin ? (
        <FormLogin
          show={showModal}
          onHide={() => setShowModal(false)}
          onSwitchForm={handleSwitchForm}
        />
      ) : (
        <FormRegister
          show={showModal}
          onHide={() => setShowModal(false)}
          onSwitchForm={handleSwitchForm}
        />
      )}
    </Col>
  );
});

export default ProductItem;
