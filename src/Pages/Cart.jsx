import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const Cart = () => {
  return (
    <Container>
      <h2 className="mb-4">Shopping Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Floral Bliss</td>
            <td>1</td>
            <td>₹1200</td>
            <td>₹1200</td>
            <td><Button variant="danger">Remove</Button></td>
          </tr>
        </tbody>
      </Table>
      <Button variant="success">Proceed to Checkout</Button>
    </Container>
  );
};

export default Cart;