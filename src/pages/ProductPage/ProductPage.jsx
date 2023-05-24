import React, { useContext, useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addProductToBasket, createReview, fetchOneProduct } from "../../http/productAPI";
import Review from "../../components/Review/Review";
import { CATEGORY_ROUTE, MAIN_ROUTE, PROFILE_ROUTE } from "../../utils/consts";
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
      .then((data) => product.setSelectedProduct(data))
      .finally(() => setLoading(false));
  }, [changeReviews, slug]);

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
    setChangeReviews(!changeReviews);
  };

  if (loading) {
    return <Spinner animation="grow" />;
  }

  const typeSlug = product.selectedProduct.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const separateOptions = {};

  product.selectedProduct.options.forEach((option) => {
    const { title, ...rest } = option;
    if (!separateOptions.hasOwnProperty(title)) {
      separateOptions[title] = [];
    }
    separateOptions[title].push(rest);
  });

  const productOptions = Object.keys(separateOptions);

  const changeOptions = (title, description) => {
    if (options === undefined) {
      const newOptions = productOptions.reduce((acc, option) => {
        acc[option] = "";
        return acc;
      }, {});
      newOptions[title] = description;
      setOptions(newOptions);
    } else {
      setOptions({ ...options, [title]: description });
    }
  };

  const updateAndChangeReview = () => {
    setChangeReviews(!changeReviews);
  };

  const addToBasket = (basketId, productId) => {
    const basket = user.basket.product.filter((item) => item.product.id !== productId);

    const productInBasket =
      user.basket.product.filter((item) => item.product.id === productId).length > 0;

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
                id: product.selectedProduct.id,
                name: product.selectedProduct.name,
                photos: product.selectedProduct.photos,
                price: product.selectedProduct.price,
              },
              quantity: 1,
            },
          ],
        })
      );
    }
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
            onClick={() => openModalPhoto(product.selectedProduct.photos[mainPhoto]["image"])}
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
                    key={option.id}
                    onClick={() => changeOptions(title, option.description)}
                    className={
                      options !== undefined &&
                      Object.values(options).includes(option.description)
                        ? style.optionsSelect
                        : style.options
                    }
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
            {user.isAuth
             ? (
              <div>
                {user.basket.product.filter(
                  (item) => item.product.id === product.selectedProduct.id).length > 0 
                  ? (
                  <Button
                    variant="outline-dark"
                    onClick={() =>
                      navigate(`${PROFILE_ROUTE}`, { state: "basket" })
                    }
                  >
                    Product already basket
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      addToBasket(user.basket.id, product.selectedProduct.id)
                    }
                    variant="outline-dark"
                  >
                    Add to basket
                  </Button>
                )}
              </div>
            ) : (
              <Button disabled variant="outline-dark">
                Login to add item to basket
              </Button>
            )}
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
