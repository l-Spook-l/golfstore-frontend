import React from "react";
import style from "./Review.module.css";
import { Card, Col, Row } from "react-bootstrap";
import moment from "moment";

const Review = ({ username, comment, createdAt }) => {
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

  return (
    <Row>
      <Col md={7}>
        <Card className={style.reviewCard}>
          <Card.Body>
            <Card.Title className={style.cardTitle}>{username}</Card.Title>
            <Card.Text>{timeCreate}</Card.Text>
            <Card.Footer className={style.cardFooter}>{comment}</Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Review;
