import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../../..'
import { Pagination } from 'react-bootstrap'

const Paginations = observer(() => {
  const {product} = useContext(Context)

  const limit = 24
  // console.log('pagination product', product)

  const pagesCount = Math.ceil(product.totalCount / limit)
  const pages = []

  // console.log('pagesCount', pagesCount)
  // console.log('pages', pages)

  for (let i = 0; i < pagesCount; i++) {
    pages.push(i + 1)
  }

  return (
    <Pagination className='mt-5'>
      {pages.map((page) => 
        <Pagination.First 
          key={page}
          active={product.page === page}
          onClick={() => product.setPage(page)}
        >
          {page}
        </Pagination.First>
      )}
    </Pagination>
  )
})

export default Paginations