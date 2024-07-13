import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Alert } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../slices/cartSlice";
import CartSummary from "../components/CartSummary";

const CartPage = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="mb-4 d-none d-md-block">Shopping Cart</h1>
        <h2 className="mb-4 d-md-none">Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col xs={2} md={2}>
                  <strong>Image</strong>
                </Col>
                <Col xs={3} md={3}>
                  <strong>Product Name</strong>
                </Col>
                <Col xs={3} md={2}>
                  <strong>Price</strong>
                </Col>
                <Col xs={2} md={3}>
                  <strong>Quantity</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            {cartItems.map((item) => (
              <ListGroup.Item key={item?.id}>
                <Row>
                  <Col xs={2} md={2}>
                    <Image src={item?.image} alt={item?.name} fluid rounded />
                  </Col>
                  <Col xs={3} md={3} style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Link to={`/product/${item.id}`}>{item?.name}</Link>
                  </Col>
                  <Col xs={3} md={2}>&#8377; {item?.listPrice}</Col>
                  <Col xs={2} md={3}>
                    <div className="d-flex">
                      <Button
                        variant="light"
                        onClick={() => handleDecreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                        className="p-1"
                      >
                        -
                      </Button>
                      <span className="quantity-text mx-2">
                        <strong>{item.quantity}</strong>
                      </span>
                      <Button
                        variant="light"
                        onClick={() => handleIncreaseQuantity(item.id)}
                        disabled={item.quantity >= item.countInStock}
                        className="p-1"
                      >
                        +
                      </Button>
                    </div>
                    {item.quantity >= item.countInStock && (
                      <Alert variant="warning" className="mt-2">
                        Only {item.countInStock} quantity left in stock
                      </Alert>
                    )}
                  </Col>
                  <Col xs={1} md={2}>
                    <Button type="button" variant="light" onClick={() => handleRemoveCart(item.id)}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {cartItems.length > 0 && (
        <Col md={4}>
          <h2 className="mb-4 d-md-none">Summary</h2>
          <CartSummary  showShippingPrice={false}/>
        </Col>
      )}
    </Row>
  );
};

export default CartPage;
