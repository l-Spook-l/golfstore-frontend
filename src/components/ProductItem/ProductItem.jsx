import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Image, Spinner } from "react-bootstrap";
import { BASKET_ROUTE, PRODUCT_ROUTE } from "../../utils/consts";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { BsCart, BsFillCartCheckFill } from "react-icons/bs";
import { addProductToBasket, addProductToWishList, deleteProductFromWishList, fetchListProductsBasket, fetchListProductsWishList} from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import FormLogin from "../UI/FormLogin/FormLogin";
import FormRegister from "../UI/FormRegister/FormRegister";
import style from "./ProductItem.module.css"

const ProductItem = observer(({ product }) => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(
    () => {
      console.log("получил такой товар useEffect", product.name);
      fetchListProductsBasket(user.basket.id).then((products) => {
        user.setBasket({ id: user.basket.id, product: products.results });
      });
      fetchListProductsWishList(user.wishList.id)
        .then((products) => {
          user.setWishList({ id: user.wishList.id, product: products.results });
        }).finally(() => setLoading(false));
    },
    [/* user.basket.product.length, user.wishList.product.length */]
  );

  const [productOnBasket, setProductOnBasket] = useState(
    user.basket.product.filter((item) => item.product.id === product.id).length > 0
    ? <BsFillCartCheckFill />
    : <BsCart />
  );

  const [productOnWishList, setProductOnWishList] = useState(
    user.wishList.product.filter((item) => item.product.id === product.id).length > 0 
    ? <AiTwotoneHeart />
    : <AiOutlineHeart />
  );

  const addToWishlist = (wishListId, productId) => {
    const wishList = user.wishList.product.filter((item) => item.product.id !== productId);
    const productInWishList = user.wishList.product.filter((item) => item.product.id === product.id).length > 0 

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
  };

  console.log("получил такой товар", product.name);

  const [showModal, setShowModal] = useState(false);

  const handleSwitchForm = () => {
    setShowLogin(!showLogin);
  };

  const [showLogin, setShowLogin] = useState(true);

  const clickLogin = () => {
    setShowModal(true);
    setShowLogin(true);
  };

  /* if (loading) {
    return <Spinner animation='grow'/>
  } */

  console.log("qweqweqweqwe", user.isAuth);

  return (
    <Col md={3} className="mt-3">
      <Card style={{ width: 200 }} border="light">
        <Button
          className={style.butthonWishlist}
          onClick={() => {
            user.isAuth
              ? addToWishlist(user.wishList.id, product.id)
              : clickLogin();
          }}
        >
          {productOnWishList}
        </Button>
        <Image
          onClick={() => navigate(`${PRODUCT_ROUTE}/${product.slug}`)}
          width={200}
          height={200}
          src={product.photo}
        />
        <div onClick={() => navigate(`${PRODUCT_ROUTE}/${product.slug}`)}>
          {product.name}
        </div>
        <div className="mt-1 d-flex justify-content-between align-items-center">
          <div>{product.price} $</div>
          <NavLink
            style={{ fontSize: "1.3rem", color: "black" }}
            onClick={() => addToBasket(user.basket.id, product.id)}
          >
            {productOnBasket}
          </NavLink>
        </div>
      </Card>

      {showLogin 
      ?
        <FormLogin
          show={showModal}
          onHide={() => setShowModal(false)}
          onSwitchForm={handleSwitchForm}
        />
      :
        <FormRegister
          show={showModal}
          onHide={() => setShowModal(false)}
          onSwitchForm={handleSwitchForm}
        />
      }
    </Col>
  );
});

export default ProductItem;
