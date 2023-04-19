import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Context } from "../index";

const TypeBar = observer(() => {
  const { product } = useContext(Context);
/*   console.log('selectedType', product.selectedType);
  console.log('selectedType id', product.selectedType.name);
  console.log('selectedType', typeof product.selectedType);
  console.log('product.products TypeBar', product.products);
  console.log('-------------------------------------------------------------'); */
  //console.log('selectedType', product.selectedType, typeof product.selectedType);
  //console.log('types', product.types);
  //console.log(product.setSelectedType.length)


  return (
    <ListGroup>
      {/* <Button onClick={() => product.setSelectedType(2211)}>All</Button> */}
      <ListGroupItem
      style={{cursor: 'pointer'}}
      active={product.setSelectedType.length === 0}
      onClick={() => product.setSelectedType([])}
      >
      All
      </ListGroupItem>
      {product.types.map((type) => 
        <ListGroup.Item
          style={{cursor: 'pointer'}}
          active={product.selectedType.includes(type)}
          key={type.id}
          onClick={() => product.setSelectedType(type)}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  )
})

export default TypeBar;
