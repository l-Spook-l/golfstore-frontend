import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Context } from "../..";
import {
  deleteProductFromWishList,
  fetchListProductsWishList,
} from "../../http/productAPI";
import { FaTimes } from 'react-icons/fa';

const WishListPage = observer(() => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true)

  /* console.log("wishList user wishList", user.wishList);
  console.log("wishList user wishList", user.wishList.id);
  console.log("wishList user wishList", user.wishList.product); */

  /* console.log('WishListPage user', user)
  console.log('WishListPage user user', user.user)
  console.log('WishListPage user user id', user.user.id) */

  useEffect(() => {
    fetchListProductsWishList(user.wishList.id).then((products) => {
      user.setWishList({ id: user.wishList.id, product: products.results });
    }).finally(() => setLoading(false));
  }, [user.wishList.product.length]);

  const deleteProduct = (wishListId, productId) => {
    deleteProductFromWishList(wishListId, productId);
    const wishList = user.wishList.product.filter(item => item.product.id !== productId)
    user.setWishList({ id: wishListId, product: wishList });
  }

  if (loading) {
    return <Spinner animation='grow'/>
  }
  
  return (
    <Container style={{paddingTop: '63px'}}>
      <Row>
      <h2>Список желаний</h2>
        {user.wishList.product.map((el) => 
          <Card style={{ width: 200, cursor: "pointer" }} border="light" key={el.product.id} className="m-2">
           <Button
              style={{width: '30px', height: '30px'}}
              onClick={() =>
                deleteProduct(user.wishList.id, el.product.id)
              }
              className="btn-danger"
            >
              <FaTimes/>
            </Button>
            <Image width={180} height={180} src={el.product.photo} />
            <div>{el.product.name}</div>
            <div className="m-auto">
              <div>{el.product.price}</div>
            </div>
          </Card>
        )}
      </Row>
    </Container>
  );
});

export default WishListPage;
