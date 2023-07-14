import React from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import productList from '../data/productList';

export default function OrderHistory() {
  const navigate = useNavigate();
  const location = useLocation ();
  const data = location.state;
  console.log('data: ', data);

  productList.map(item => {
    console.log(item.productNo);
    console.log(data.productNo);
    console.log(item.productNo === data.productNo);
  })

  const product = productList.find(item => item.productNo === data.productNo ? data.productNo : '');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/special');
  };

  return (
    <Container>
      <Row >
        <div className="spVisualTit">
          <div>
            <h1>
              주문내역
              <hr />
            </h1>
          </div>
          <img
            src={product ? product.photoUrl : '#'}
            alt={product ? product.name : ''}
            className="pic-thumb"
          />
        </div>
        <Form>
        <Form.Group as={Row} controlId="customerName">
            <Col sm={2} />
            <Form.Label column sm={2}>
              주문번호
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={product ? data.orderNo : ''}
                disabled
                readOnly
                style={{ letterSpacing: '5px', fontFamily: 'Arial' }}
              />
            </Col>
            <Col sm={2} />
          </Form.Group>
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
                value={product ? data.customerName : ''}
                disabled
                readOnly
                style={{ letterSpacing: '5px', fontFamily: 'Arial' }}
              />
            </Col>
            <Col sm={2} />
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button variant="dark" onClick={handleClick}>
                상품 목록으로 돌아가기
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}
