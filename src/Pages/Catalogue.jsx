import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProductCard from '../Component/ProductCard';

const sampleProducts = [
  { id: 1, name: 'Floral Bliss', price: 1200, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Woody Dreams', price: 1500, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Citrus Burst', price: 1000, image: 'https://via.placeholder.com/150' },
];

const Catalogue = () => {
  return (
    <Container>
      <h2 className="mb-4">Our Collection</h2>
      <Row>
        {sampleProducts.map(product => (
          <Col md={4} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Catalogue;