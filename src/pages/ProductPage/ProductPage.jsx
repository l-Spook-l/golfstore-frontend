import React, { useContext, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { fetchOneProduct } from "../../http/productAPI";
import Review from "../../components/Review/Review";
import { CATEGORY_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import { Context } from "../..";

const ProductPage = () => {
  const [product, setProduct] = useState({ info: [] });
  const {user} = useContext(Context)

  // id нашего продукта
  const { slug } = useParams();
  console.log("params in product one", { slug });
  //console.log('product in product one', product)
  //console.log('product in product one name', product.name)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOneProduct(slug)
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
    /* console.log('data one ', data) */
  }, []);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  const typeSlug = product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <Container style={{ paddingTop: "100px" }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to={MAIN_ROUTE}>
            Home
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to={`${CATEGORY_ROUTE}/${typeSlug}`}>
            {product.category}
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb> 
      <hr />
      <Row className="mb-5">
        <Col md={4}>
          <Image width={300} height={300} src={product.photo} />
          {/* {product.photo.map((el) => <Image width={50} height={50}></Image>)} */}
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{product.name}</h2>
            
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d=flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>{product.price} $</h3>
            <p>Quantity  - +</p>
            <Button variant="outline-dark">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      
      <div className="d-flex">
        <p>Reviews</p>
        {user.isAuth 
        ? 
        <Col>
          <Button>Add a review</Button> 
        </Col> 
        : <div></div>
        }
        
      </div>
      
      {product.reviews.map((review) => (
        <Row key={review.id}>
          <Review
            key={review.id}
            username={review.username}
            comment={review.comment}
            createdAt={review.created_at} 
          />
         </Row>
      ))}
      
    </Container>
  );
};

export default ProductPage;
