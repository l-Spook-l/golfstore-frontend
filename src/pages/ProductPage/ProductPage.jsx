import React, { useContext, useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { createReview, fetchOneProduct } from "../../http/productAPI";
import Review from "../../components/Review/Review";
import { CATEGORY_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import { Context } from "../..";
import style from "./ProductPage.module.css";
import PhotoModal from "../../components/UI/PhotoModal/PhotoModal";
import ProductSlider from "../../components/UI/ProductSlider/ProductSlider";
import ReviewForm from "../../components/UI/ReviewForm/ReviewForm";
import { observer } from "mobx-react-lite";

const ProductPage = observer(() => {
  const { user } = useContext(Context);
  // id нашего продукта
  const { slug } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({ info: [] });

  const [showModalPhoto, setShowModalPhoto] = useState(false);
  const [showModalAddReview, setShowModalAddReview] = useState(false);

  const [mainPhoto, setMainPhoto] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    fetchOneProduct(slug)
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
      console.log('product opage review', product.reviews)
  }, []);

  const openModalPhoto = (image) => {
    setSelectedPhoto(image);
    setShowModalPhoto(true);
  };

  const handleCloseModalPhoto = () => {
    setShowModalPhoto(false);
  };

  const chageMainPhoto = (id) => {
    setMainPhoto(id);
  };

  const openModalAddReview = () => {
    setShowModalAddReview(true)
  };

  const handleCloseModalAddReview = () => {
    setShowModalAddReview(false)
  }

  const handleSubmitReview = (review) => {
    // Выполните необходимые действия с комментарием, например, отправьте его на сервер или обновите состояние компонента
    console.log('Submitted review:', user.user.id);
    console.log('Submitted review:', review);
    const currentDate = new Date()
    console.log('Submitted review:', currentDate);
    createReview(review, product.id, user.user.id)
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
        <Breadcrumb.Item
          onClick={() => navigate(`${CATEGORY_ROUTE}/${typeSlug}`)}
        >
          {product.category}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Row className="mb-5">
        <Col md={4} className="d-flex flex-column">
          <Image
            className={style.mainPhoto}
            onClick={() => openModalPhoto(product.photos[mainPhoto]["image"])}
            src={product.photos[mainPhoto]["image"]}
          />
          <ProductSlider photos={product.photos} onSelect={chageMainPhoto} />
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
            <Button variant="outline-dark">Add to cart</Button>
          </Card>
        </Col>
      </Row>

      <div className="d-flex">
        <p>Reviews</p>
        {user.isAuth ? (
          <Col className=" d-flex justify-content-end" md={7}>
            <Button className="bg-success" onClick={() => openModalAddReview()}>Add a review</Button>
          </Col>
        ) : (
          <div></div>
        )}
      </div>

      {product.reviews.map((review) => (
        <Row key={review.id} className="">
          <Review
            key={review.id}
            reviewId={review.id}
            userId={review.user}
            username={review.username}
            comment={review.comment}
            createdAt={review.created_at}
          />
        </Row>
      ))}

      {showModalPhoto && (
        <PhotoModal image={selectedPhoto} onClose={handleCloseModalPhoto} />
      )}
      {showModalAddReview && (
        <ReviewForm show={showModalAddReview} onHide={handleCloseModalAddReview} onSubmit={handleSubmitReview} state={'Add review'}/>
      )}
      

    </Container>
  );
});

export default ProductPage;
