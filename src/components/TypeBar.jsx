import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Context } from "../index";

const TypeBar = observer(() => {
  const { product } = useContext(Context);
  console.log('selectedType', product.selectedType);
  console.log('product', product);

  const handleTypeSelection = (type) => {
    product.handleTypeSelection(type); // Вызываем метод handleTypeSelection из ProductStore
  }

  return (
    <ListGroup>
      {product.types.map((type) =>
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          active={product.selectedType.includes(type.id)}
          key={type.id}
          onClick={() => handleTypeSelection(type)}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  )
})

export default TypeBar;
