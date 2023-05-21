import React, { useContext, useState } from "react";
import style from "./Review.module.css";
import { Card, Col, Row } from "react-bootstrap";
import moment from "moment";
import { Context } from "../..";
import { deleteReview, updateReview } from "../../http/productAPI";
import ReviewForm from "../UI/ReviewForm/ReviewForm";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const Review = ({ reviewId, userId, first_name, comment, createdAt }) => {
  const {user} = useContext(Context) 

  const [showModalUpdateReview, setShowModalUpdateReview] = useState(false);

  const now = moment();
  const created = moment(createdAt);
  const diffInHours = now.diff(created, "hours");
  const diffInDays = now.diff(created, "days");

  let timeCreate = 0;
  if (diffInHours === 0) {
  timeCreate = "less than an hour ago";
  } else if (diffInHours < 24) {
  timeCreate = `${diffInHours} hours ago`;
  } else if (diffInDays === 1) {
  timeCreate = "yesterday";
  } else {
  timeCreate = `${diffInDays} days ago`;
  }

  const openModalUpdateReview = () => {
    setShowModalUpdateReview(true)
  };

  const handleCloseModalUpdateReview = () => {
    setShowModalUpdateReview(false)
  }

  const handleUpdateReview = (comment) => {
    updateReview(reviewId, comment)
  };

  return (
    <Row>
      <Col md={8}>
        <Card className={style.reviewCard}>
          <Card.Body>
            <Card.Title className={style.cardTitle}>
              {first_name}
              {user.isAuth && userId === user.user.id
              ? 
              <div>
                <button className={style.butthonUpdateReview} onClick={() => openModalUpdateReview(reviewId)}><AiOutlineEdit/></button>
                <button className={style.butthonDeleteReview} onClick={() => deleteReview(reviewId)}><AiOutlineDelete/></button>
              </div>
              :  null
              }
              </Card.Title>
            <Card.Text>{timeCreate}</Card.Text>
            <Card.Footer className={style.cardFooter}>{comment}</Card.Footer>
          </Card.Body>
        </Card>
      </Col>
      {showModalUpdateReview && (
        <ReviewForm show={showModalUpdateReview} onHide={handleCloseModalUpdateReview} onSubmit={handleUpdateReview} state={'Update'} oldComment={comment}/>
      )}
    </Row>
  );
};

export default Review;
