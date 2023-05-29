import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../../..";
import { Pagination } from "react-bootstrap";
import style from "./Paginations.module.css";

const Paginations = observer(() => {
  const { product } = useContext(Context);

  const limit = 24;

  const pagesCount = Math.ceil(product.totalCount / limit);
  const pages = [];

  for (let i = 0; i < pagesCount; i++) {
    pages.push(i + 1);
  }

  const selectPage = (page) => {
    product.setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <Pagination className='mt-5'>
      {pages.map((page) => 
        <div 
          key={page}
          onClick={() => selectPage(page)}
          className={`${style.button} ${page === product.page ? style.buttonActive : style.buttonInactive}`}
        >
          {page}
        </div>
      )}
    </Pagination>
    /* <Pagination className='mt-5'>
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          onClick={() => selectPage(page)}
          active={page === product.page}
          >
          {page}
        </Pagination.Item>
      ))}
    </Pagination> */
  );
});

export default Paginations;
