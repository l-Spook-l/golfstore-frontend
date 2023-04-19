import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Context } from "../..";

const Profile = observer(() => {
  const { product } = useContext(Context);
  console.log('product.products Profile', product.products);

  const typesTest = [
    { id: 1, name: "Golf clubs" },
    { id: 2, name: "Golf clothing" },
    { id: 3, name: "Golf shoes" },
  ];
  const brandsTest = [
    { id: 1, name: "Adidas Golf" },
    { id: 2, name: "Bridgestone Golf" },
    { id: 3, name: "Callaway Golf" },
    { id: 4, name: "TaylorMade Golf" },
    { id: 5, name: "PING Golf" },
  ];
  const productsTest = [
    {
      id: 1,
      name: "PING Men's G430 MAX Driver",
      price: 549,
      rating: 0,
      brand: "PING Golf",
      type: "Golf clubs",
      photo: "photos/product/PING_Mens_G430_MAX_Driver_dLLZ5Ri.jpg",
    },
    {
      id: 2,
      name: "TaylorMade Men's Stealth 2 Plus Driver",
      price: 549,
      rating: 0,
      brand: "TaylorMade Golf",
      type: "Golf clubs",
      photo: "photos/product/TaylorMade_Mens_Stealth_2_Plus_Driver.jpg",
    },
    {
      id: 3,
      name: "Callaway Men's Paradym Driver",
      price: 549,
      rating: 0,
      brand: "Callaway Golf",
      type: "Golf clubs",
      photo: "photos/product/Callaway_Mens_Paradym_Driver.jpg",
    },
    {
      id: 4,
      name: "adidas Women's Performance Golf Polo",
      price: 54,
      rating: 0,
      brand: "Adidas Golf",
      type: "Golf clothing",
      photo: "photos/product/Callaway_Mens_Paradym_Driver.jpg",
    },
  ];

  const [selectedBrands, setSelectedBrands] = useState([]); // Создаем состояние для выбранных брендов
  const [selectedTypes, setSelectedTypes] = useState([]); // Создаем состояние для выбранных типов

  const filterProductsByBrandAndType = () => {
    return productsTest.filter(
      (product) =>
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        (selectedTypes.length === 0 || selectedTypes.includes(product.type))
    );
  };

  const handleBrandSelect = (brand) => {
    if (!selectedBrands.includes(brand.name)) {
      setSelectedBrands([...selectedBrands, brand.name]);
    } else {
      setSelectedBrands(
        selectedBrands.filter((selectedBrand) => selectedBrand !== brand.name)
      );
    }
  };

  const handleTypeSelect = (type) => {
    if (!selectedTypes.includes(type.name)) {
      setSelectedTypes([...selectedTypes, type.name]);
    } else {
      setSelectedTypes(
        selectedTypes.filter((selectedType) => selectedType !== type.name)
      );
    }
  };

  return (
    <div>
      Profile
      <br />
      {selectedBrands.map((ell) => (
        <span key={ell.id}>{ell}</span>
      ))}
      <br />
      {selectedTypes.map((ell) => (
        <span key={ell.id}>{ell}</span>
      ))}
      <br />
      {console.log("selectedBrands", selectedBrands)}
      <Row>
        <Col className="d-flex flex-wrap" style={{ height: 40 }}>
          {brandsTest.map((brand) => (
            <Card
              key={brand.id}
              className="p-2 m-1"
              style={{ cursor: "pointer" }}
              onClick={() => handleBrandSelect(brand)}
              border={brand.id === productsTest.id ? "danger" : "light"}
            >
              <Form.Check
                type="checkbox"
                checked={selectedBrands.includes(brand.name)} // Определение, должен ли быть флажок отмечен или нет
                onChange={() => handleBrandSelect(brand)} // Обработчик событий onChange для обновления состояния выбранных брендов
              />
              {brand.name}
            </Card>
          ))}
        </Col>
      </Row>
      <br />
      <br />
      <Col md={1}>
        <ListGroup>
          {typesTest.map((type) => (
            <ListGroup.Item
              style={{ cursor: "pointer" }}
              active={selectedTypes.includes(type.name)}
              key={type.id}
              onClick={() => handleTypeSelect(type)}
            >
              {type.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <br />
      {product.products.map((el) => {
        <h6>{el.name}</h6>
      })
      }
      <br />
      <br />
      <Row>
        {filterProductsByBrandAndType().map((el) => (
          <Card
            style={{ width: 150, cursor: "pointer" }}
            border="light"
            key={el.id}
          >
            <Image width={150} height={150} src={el.photo} />
            <div className="mt-1 d-flex justify-content-between align-items-center">
              <p style={{ color: "burlywood" }}>{el.brand}</p>
              <div className="d-flex align-items-center">
                <div>{el.rating}</div>
                <Image
                  width={18}
                  height={18}
                  style={{ backgroundColor: "blue" }}
                />
              </div>
            </div>
            <div>{el.name}</div>
          </Card>
        ))}
      </Row>
    </div>
  );
});

export default Profile;
