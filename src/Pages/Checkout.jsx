import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Checkout = () => {
    console.log('Checkout component rendered');
  return (
    <Container>
      <h2 className="mb-4">Checkout</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter address" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Select>
            <option>Credit/Debit Card</option>
            <option>UPI</option>
            <option>Cash on Delivery</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">Place Order</Button>
      </Form>
    </Container>
  );
};

export default Checkout;