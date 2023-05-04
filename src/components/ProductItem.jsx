import React, { useContext } from "react";
import { Button, Card, Col, Image } from "react-bootstrap";
import { BASKET_ROUTE, PRODUCT_ROUTE } from "../utils/consts";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { addProductToBasket, addProductToWishList } from "../http/productAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const ProductItem = observer(({ product }) => {
  const { user } = useContext(Context) 

  const navigate = useNavigate();
  
  console.log("ProductItem user wishList", user.wishList.id);


  return (
    <Col md={3} className="mt-3">
      <Card style={{ width: 150 }} border="light">
        <Button
          style={{ fontSize: "1.3rem", color: "black" }}
          onClick={() =>
            addProductToWishList({ product: product.id, wishlist: user.wishList.id })
          }
        >
          <AiOutlineHeart />
        </Button>
        <Image
          onClick={() => navigate(`${PRODUCT_ROUTE}/${product.slug}`)}
          width={150}
          height={150}
          src={product.photo}
        />
        <div onClick={() => navigate(`${PRODUCT_ROUTE}/${product.slug}`)}>
          {product.name}
        </div>
        <div className="mt-1 d-flex justify-content-between align-items-center">
          <div>{product.price}</div>
          <NavLink
            style={{ fontSize: "1.3rem", color: "black" }}
            onClick={() =>
              addProductToBasket({ product: product.id, basket: user.basket.id })
            }
            //to={BASKET_ROUTE}
          >
            <AiOutlineShoppingCart />
          </NavLink>
        </div>
      </Card>
    </Col>
  );
});

export default ProductItem;
