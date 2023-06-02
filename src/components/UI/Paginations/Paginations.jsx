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

  console.log('paginationspaginationspaginations', pages)

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
/* 
  const listPages = []

  [1, 2, 3]
  [1, 2, 3, 4]
  [1, 2, 3, 4, 5]
  [1, 2, 3, 4, 5, 6]
  [1, 2, 3, 4, 5, 6, 7]
  [1, 2, 3, 4, 5, 6, 7, 8]

  [1, 2, '...', 9] - 1
  [1, 2, 3, '...', 9] - 2
  [1, 2, 3, 4, '...', 9] - 3
  [1, '...', 3, 4, 5, '...', 9] - 4 
  [1, '...', 6, 7, 8, 9] - 7
  [1, '...', 7, 8, 9] - 8 
  [1, '...', 8, 9] - 9

  let page = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  if (pagesCount <== 8 ) {
    page
  } else {
    if (product.page === 1) { 
      page = [1, 2, '...', pagesCount] 
      //[1, 2, '...', 9] 
    } else if (product.page === pagesCount) {
      page = [1, '...', pagesCount - 1, pagesCount]
      //[1, '...', 8, 9]
    } else if (product.page === 2 ) {
      page = [1, 2, 3, '...', pagesCount]
      //[1, 2, 3, '...', 9]
    } else if (product.page === (pagesCount - 1)) {
      page = [1, '...', pagesCount - 2, pagesCount - 1, pagesCount]
      //[1, '...', 7, 8, 9]
    } else if (product.page === 3) {
      page = [1, 2, 3, 4, '...', pagesCount]
      //[1, 2, 3, 4, '...', 9]
    } else if (product.page === (pagesCount - 2)) {
      page = [1, '...', pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount]
      //[1, '...', 6, 7, 8, 9]
    } else {
      page = [1, '...', product.page - 1, product.page, product.page + 1, '...', pagesCount]
      //[1, '...', 4, 5, 6, '...', 9]
    }
  }

  product.page - активная стр

  Math.ceil((page.length - 1) / 2) - округляем к большему

  const firstPage = page[0]
  const lastPage = pagesCount


1 2 ... 8 ... 15 16
12 345 6 78910 1112
12 345 6 789 1011
12 34 5 678 910
12 34 5 67 89
12 3 4 56 78
12 3 4 5 67
123456

*/
export default Paginations;
