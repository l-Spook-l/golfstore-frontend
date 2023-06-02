import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../..";
import { Pagination } from "react-bootstrap";
import style from "./Paginations.module.css";

const Paginations = observer(() => {
  const { product } = useContext(Context);

  const limit = 24;

  const pagesCount = Math.ceil(product.totalCount / limit);
  let pages = [];

  const selectPage = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    product.setPage(page);
  };

  if (pagesCount <= 8 ) {
    for (let i = 0; i < pagesCount; i++) {
      pages.push(i + 1);
    }
  } else {
    if (product.page === 1) { 
      pages = [1, 2, '...', pagesCount] 
    } else if (product.page === pagesCount) {
      pages = [1, '...', pagesCount - 1, pagesCount]
    } else if (product.page === 2 ) {
      pages = [1, 2, 3, '...', pagesCount]
    } else if (product.page === (pagesCount - 1)) {
      pages = [1, '...', pagesCount - 2, pagesCount - 1, pagesCount]
    } else if (product.page === 3) {
      pages = [1, 2, 3, 4, '...', pagesCount]
    } else if (product.page === (pagesCount - 2)) {
      pages = [1, '...', pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount]
    } else {
      pages = [1, '...', product.page - 1, product.page, product.page + 1, '...', pagesCount]
    }
  }

  return (
    <Pagination className="mt-5 ms-3">
      {pages.map((page, index) => (
        <button
          key={index}
          disabled={page === "..."}
          onClick={() => selectPage(page)}
          className={`${style.button} ${
            page === product.page || page === "..."
            ? style.buttonActive 
            : style.buttonInactive
          }`}
        >
          {page}
        </button>
      ))}
    </Pagination>
  );
});

export default Paginations;
