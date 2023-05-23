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
import { useNavigate, useParams } from "react-router-dom";
import { createReview, deleteReview, fetchOneProduct } from "../../http/productAPI";
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
  const { product } = useContext(Context);
  const { slug } = useParams();

  const navigate = useNavigate();

  const [showModalPhoto, setShowModalPhoto] = useState(false);
  const [showModalAddReview, setShowModalAddReview] = useState(false);
  const [changeReviews, setChangeReviews] = useState(true);

  const [mainPhoto, setMainPhoto] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const [options, setOptions] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOneProduct(slug)
      .then((data) => {
        console.log('useEffect data', data)
        product.setSelectedProduct(data)
      })
      .finally(() => setLoading(false));
    /* console.log(
      "product.selectedProduct.reviews.length product.selectedProduct",
      product.selectedProduct
    );
    console.log(
      "product.selectedProduct.reviews.length product.selectedProduct.reviews",
      product.selectedProduct.reviews
    ); */
    console.log('ProductPage useEffect')
  }, [changeReviews]);

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
    setShowModalAddReview(true);
  };

  const handleCloseModalAddReview = () => {
    setShowModalAddReview(false);
  };

  const handleSubmitReview = (review) => {
    createReview(review, product.selectedProduct.id, user.user.id);
    setChangeReviews(!changeReviews)
  };

  
  if (loading) {
    return <Spinner animation="grow" />;
  }

  const typeSlug = product.selectedProduct.category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const separateOptions = {};

  product.selectedProduct.options.forEach((option) => {
    const { title, ...rest } = option;
    if (!separateOptions.hasOwnProperty(title)) {
      separateOptions[title] = [];
    }
    separateOptions[title].push(rest);
  });

  const productOptions = Object.keys(separateOptions);
  //console.log("productOptions productOptions productOptions", productOptions);

  console.log(
    "product.selectedProduct product.selectedProduct",
    product.selectedProduct
  );
 /*  console.log(
    "product.selectedProduct.reviews.length product.selectedProduct.reviews",
    product.selectedProduct.reviews
  );
  console.log(
    "product.selectedProduct.reviews.length product.selectedProduct.reviews.length",
    product.selectedProduct.reviews.length
  ); */

  const changeOptions = (title, description) => {
    if (options === undefined) {
      const newOptions = productOptions.reduce((acc, option) => {
        acc[option] = "";
        return acc;
      }, {});
      newOptions[title] = description;
      setOptions(newOptions);
      console.log("test test selectedOptions", options);
      console.log("test test title", title);
      console.log("test test description", description);
    } else {
      setOptions({ ...options, [title]: description });
    }
    console.log("test test selectedOptions 2", options);
  };
  const updateAndChangeReview = () => {
    setChangeReviews(!changeReviews)
  }
  console.log("selectedOptions", options);
  console.log("changeReviewschangeReviews", changeReviews);
  const handleDeleteReview = (reviewId) => {
    setChangeReviews(!changeReviews)
    deleteReview(reviewId)
    const reviews = product.selectedProduct.reviews.filter(
      (review) => review.id !== reviewId
    );
    console.log('delete func', reviews)
    console.log(
      "delete func product.selectedProduct 1",
      product.selectedProduct
    );
    product.setSelectedProduct({ ...product.selectedProduct, reviews: reviews });
    console.log(
      "delete func product.selectedProduct 2",
      product.selectedProduct
    );
  };
  return (
    <Container className={style.forContainer}>
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate(MAIN_ROUTE)}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => navigate(`${CATEGORY_ROUTE}/${typeSlug}`)}
        >
          {product.selectedProduct.category}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.selectedProduct.name}</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Row className="mb-5">
        <Col md={4} className="d-flex flex-column">
          <Image
            className={style.mainPhoto}
            onClick={() =>
              openModalPhoto(product.selectedProduct.photos[mainPhoto]["image"])
            }
            src={product.selectedProduct.photos[mainPhoto]["image"]}
          />
          <ProductSlider
            photos={product.selectedProduct.photos}
            onSelect={chageMainPhoto}
          />
        </Col>

        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{product.selectedProduct.name}</h2>
            {Object.keys(separateOptions).map((title) => (
              <div key={title}>
                <p className={style.optionsTitle}>{title}:</p>
                {separateOptions[title].map((option) => (
                  <span
                    onClick={() => changeOptions(title, option.description)}
                    className={
                      options !== undefined &&
                      Object.values(options).includes(option.description)
                        ? style.optionsSelect
                        : style.options
                    }
                    key={option.id}
                  >
                    {option.description}
                  </span>
                ))}
              </div>
            ))}
          </Row>
        </Col>

        <Col md={4}>
          <Card className={style.blockPriceAndButtonToBasket}>
            <h3>{product.selectedProduct.price} $</h3>
            <Button variant="outline-dark">Add to basket</Button>
          </Card>
        </Col>
      </Row>

      <div className="d-flex mb-3">
        <h4>Reviews</h4>
        {user.isAuth ? (
          <Col className=" d-flex justify-content-end" md={7}>
            <Button className="bg-success" onClick={() => openModalAddReview()}>
              Add a review
            </Button>
          </Col>
        ) : (
          <div></div>
        )}
      </div>
      {product.selectedProduct.reviews.length > 0 ? (
        <div>
          {product.selectedProduct.reviews.map((review) => (
            <Row key={review.id} className="">
              <Review
                key={review.id}
                reviewId={review.id}
                userId={review.user}
                first_name={review.first_name}
                comment={review.comment}
                createdAt={review.created_at}
                changeReview={updateAndChangeReview}
              />
              <Button onClick={() => handleDeleteReview(review.id)}>delete</Button>
            </Row>
          ))}
        </div>
      ) : (
        <p className={style.noneReviews}>
          This product does not have any reviews yet. Be the first to leave a
          review!
        </p>
      )}

      {showModalPhoto && (
        <PhotoModal image={selectedPhoto} onClose={handleCloseModalPhoto} />
      )}
      {showModalAddReview && (
        <ReviewForm
          show={showModalAddReview}
          onHide={handleCloseModalAddReview}
          onSubmit={handleSubmitReview}
          state={"Add review"}
        />
      )}
    </Container>
  );
});

export default ProductPage;
