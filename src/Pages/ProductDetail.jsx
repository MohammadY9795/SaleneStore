import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const product = { name: 'Floral Bliss', price: 1200, description: 'A floral perfume.', image: 'https://via.placeholder.com/300' };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.name} className="img-fluid" />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>₹{product.price}</h4>
          <Button variant="primary">Add to Cart</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
