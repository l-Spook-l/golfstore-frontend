import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { PRODUCT_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BsCart, BsFillCartCheckFill } from "react-icons/bs";
import { addProductToBasket, addProductToWishList, deleteProductFromWishList } from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import FormLogin from "../Forms/FormLogin/FormLogin";
import FormRegister from "../Forms/FormRegister/FormRegister";
import style from "./ProductItem.module.css";

const ProductItem = observer(({ product }) => {
  const { user } = useContext(Context);

  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [productOnBasket, setProductOnBasket] = useState();
  const [productOnWishList, setProductOnWishList] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    user.basket.product.filter((item) => item.product.id === product.id)
      .length > 0
      ? setProductOnBasket(<BsFillCartCheckFill />)
      : setProductOnBasket(<BsCart />);
    user.wishList.product.filter((item) => item.product.id === product.id)
      .length > 0
      ? setProductOnWishList(<AiTwotoneHeart />)
      : setProductOnWishList(<AiOutlineHeart />);
  }, [user.basket.product]);

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

    const productInBasket =
      user.basket.product.filter((item) => item.product.id === product.id)
        .length > 0;

    if (productInBasket) {
      navigate(`${PROFILE_ROUTE}`, { state: "basket" });
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
              quantity: 1,
            },
          ],
        })
      );
      setProductOnBasket(<BsFillCartCheckFill />);
    }
  };

  const handleSwitchForm = () => {
    setShowLogin(!showLogin);
  };

  const clickLogin = () => {
    setShowModal(true);
    setShowLogin(true);
  };

  // При наведении курсора показываем другое фото (если оно есть)
  const hoverProduct = (productId) => {
    setIsHovered(true);
    setActiveProduct(productId);
  };

  return (
    <div>
      <Card className={style.myCard}>
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
        <Card.Img
          className={style.myImage}
          onClick={() => navigate(`${PRODUCT_ROUTE}/${product.slug}`)}
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
        <Card.Body className={style.cardBody}>
          <div
            className={style.nameProduct}
            onClick={() => navigate(`${PRODUCT_ROUTE}/${product.slug}`)}
          >
            {product.name}
          </div>
          <div className={style.priceAndBasketProduct}>
            <div>{product.price} $</div>
            <div
              className={style.buttonBasket}
              onClick={() => {
                user.isAuth
                  ? addToBasket(user.basket.id, product.id)
                  : clickLogin();
              }}
            >
              {productOnBasket}
            </div>
          </div>
        </Card.Body>
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
    </div>
  );
});

export default ProductItem;
