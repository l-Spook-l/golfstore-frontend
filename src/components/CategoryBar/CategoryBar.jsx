import React, { useContext } from 'react'
import { Context } from '../..';
import { Accordion } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const CategoryBar = observer(() => {
  const { product } = useContext(Context);
  // console.log('selectedBrand', product.selectedBrand);

  return (  
    <Accordion className="mt-3" defaultActiveKey="0">
      <Accordion.Item  className="border-0" eventKey="0">
        <Accordion.Header>Categories</Accordion.Header>
        <Accordion.Body className="">
          {product.categories.map((category) => (
            <div key={category.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input me-3 "
                checked={product.selectedCategory.includes(category)}
                onChange={() => product.setSelectedCategory(category)}
              />
              <label
                className="form-check-label"
                style={{ cursor: "pointer" }}
                onClick={() => product.setSelectedCategory(category)}
              >
                {category.name}
              </label>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
});

export default CategoryBar