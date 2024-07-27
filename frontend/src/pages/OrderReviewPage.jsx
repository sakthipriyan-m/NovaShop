import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProgressTracker from "../components/CheckoutProgressTracker";
import Message from "../components/Message";
import CartSummary from "../components/CartSummary";
import Payment from "../components/Payment";
import Loader from "../components/Loader/Loader";

const OrderReviewPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const handleBackToShipping = () => {
    navigate("/shipping");
  };

  return (
    <>
      {loading && <Loader />}
      <CheckoutProgressTracker reviewOrder />
      <Row>
        <Col md={8}>
          <Row>
            <Col md={6}>
              <div style={{ padding: "15px" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Address: </strong>
                      <br />
                      {shippingAddress.address},
                      <br />
                      {shippingAddress.address2 && (
                        <>
                          {shippingAddress.address2},
                          <br />
                        </>
                      )}
                      {shippingAddress.city} - {shippingAddress.postalCode},
                      <br />
                      {shippingAddress.state}, {shippingAddress.country}
                    </p>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
            <Col md={6}>
              <div style={{ padding: "15px" }}>
                <Payment />
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="text-end">
              <Button
                type="button"
                variant="light"
                onClick={handleBackToShipping}
              >
                Back to Shipping
              </Button>
            </Col>
          </Row>
          <Card className="mt-3">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Items</h2>
                {cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.quantity} x ₹{item.listPrice} = ₹{item.quantity * item.listPrice}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <CartSummary reviewOrder setLoading={setLoading}/>
        </Col>
      </Row>
    </>
  );
};

export default OrderReviewPage;
