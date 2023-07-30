import React, { useState, ChangeEvent } from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import productList from '../data/productList';

export default function Order() {
  const { productNo } = useParams();
  const navigate = useNavigate();

  const product = productList.find(item => item.productNo === productNo ? productNo : '');

  const [customerName, setCustomerName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Logic to send form data to the API
    // You can use fetch or axios to make an HTTP request to the API endpoint
    // Example:
    const requestBody = {
      productName: product?.name,
      originalPrice: product?.originalPrice,
      discountedPrice: product?.discountedPrice,
      customerName: customerName,
      productNo:product?.productNo,
    }

    fetch('https://api.xn--1-3x5ew15b.shop/v1/order', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response
        // console.log(data);
        navigate('/order/history', { state: data });
      })
      .catch(error => {
        // Handle any errors
      });
  };

  return (
    <Container>
      <Row >
        <div className="spVisualTit">
          <div>
            <h1>
              주문
              <hr />
            </h1>
          </div>
          <img
            src={product ? product.photoUrl : '#'}
            alt={product ? product.name : ''}
            className="pic-thumb"
          />
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="productName">
            <Col sm={2} />
            <Form.Label column sm={2}>
              상품명
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={product ? product.name : ''}
                disabled
                readOnly
                style={{ letterSpacing: '5px', fontFamily: 'Arial' }}
              />
            </Col>
            <Col sm={2} />
          </Form.Group>
          <Form.Group as={Row} controlId="originalPrice">
            <Col sm={2} />
            <Form.Label column sm={2}>
              원가
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={product ? product.originalPrice.toLocaleString() : ''}
                disabled
                readOnly
                style={{ letterSpacing: '5px', fontFamily: 'Arial' }}
              />
            </Col>
            <Col sm={2} />
          </Form.Group>
          <Form.Group as={Row} controlId="discountedPrice">
            <Col sm={2} />
            <Form.Label column sm={2}>
              할인된 가격
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={product ? product.discountedPrice.toLocaleString() : ''}
                disabled
                readOnly
                style={{ letterSpacing: '5px', fontFamily: 'Arial' }}
              />
            </Col>
            <Col sm={2} />
          </Form.Group>
          <Form.Group as={Row} controlId="customerName">
            <Col sm={2} />
            <Form.Label column sm={2}>
              주문자명
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={customerName}
                onChange={handleChange}
                style={{ letterSpacing: '5px', fontFamily: 'Arial' }}
              />
            </Col>
            <Col sm={2} />
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button variant="dark" type="submit">
                주문하기
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}
