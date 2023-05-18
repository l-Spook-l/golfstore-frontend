import React, { useContext, useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { fetchOneProduct } from "../../http/productAPI";
import Review from "../../components/Review/Review";
import { CATEGORY_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import { Context } from "../..";
import style from "./ProductPage.module.css";
import PhotoModal from "../../components/UI/PhotoModal/PhotoModal";
import ProductSlider from "../../components/UI/ProductSlider/ProductSlider";

const ProductPage = () => {
  const { user } = useContext(Context);

  const [product, setProduct] = useState({ info: [] });

  const [showModal, setShowModal] = useState(false);
  const [mainPhoto, setMainPhoto] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  // id нашего продукта
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOneProduct(slug)
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, []);

  const openModal = (image) => {
    setSelectedPhoto(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const chageMainPhoto = (id) => {
    setMainPhoto(id);
  };

  if (loading) {
    return <Spinner animation="grow" />;
  }

  const typeSlug = product.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <Container style={{ paddingTop: "100px" }}>
      <Breadcrumb>
      <Breadcrumb.Item onClick={() => navigate(MAIN_ROUTE)}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate(`${CATEGORY_ROUTE}/${typeSlug}`)}>
            {product.category}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Row className="mb-5">
        <Col md={4} className="d-flex flex-column">
          <Image
            className={style.mainPhoto}
            onClick={() => openModal(product.photos[mainPhoto]["image"])}
            src={product.photos[mainPhoto]["image"]}
          />
          <ProductSlider photos={product.photos} onSelect={chageMainPhoto}/>
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
            <p>Quantity - +</p>
            <Button variant="outline-dark">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>

      <div className="d-flex">
        <p>Reviews</p>
        {user.isAuth ? (
          <Col>
            <Button>Add a review</Button>
          </Col>
        ) : (
          <div></div>
        )}
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
      {showModal && (
        <PhotoModal image={selectedPhoto} onClose={handleCloseModal} />
      )}
    </Container>
  );
};

export default ProductPage;
