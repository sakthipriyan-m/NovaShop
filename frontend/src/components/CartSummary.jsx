import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, ListGroup, Button } from "react-bootstrap";

const CartSummary = ({ showShippingPrice, onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingPrice } = cart;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.listPrice,
    0
  );
  const shipping = parseFloat(shippingPrice) || 0;
  const total = subtotal + shipping;

  const handleCheckoutButton = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Card
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        border: "1px solid #dee2e6",
        borderRadius: "5px",
      }}
    >
      <Card.Header>
        <h4>Summary</h4>
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h5>
            Total Items:{" "}
            <span style={{ float: "right" }}>
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </h5>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>
            Subtotal:{" "}
            <span style={{ float: "right" }}>
              &#8377; {subtotal.toFixed(2)}
            </span>
          </h5>
        </ListGroup.Item>
        {showShippingPrice && location.pathname !== "/cart" && (
          <>
            <ListGroup.Item>
              <h5>
                Shipping:{" "}
                <span style={{ float: "right" }}>
                  &#8377; {shipping.toFixed(2)}
                </span>
              </h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>
                Total:{" "}
                <span style={{ float: "right" }}>
                  &#8377; {total.toFixed(2)}
                </span>
              </h5>
            </ListGroup.Item>
          </>
        )}
        {showShippingPrice ? (
          <ListGroup.Item style={{ display: "grid" }}>
            <Button
              type="button"
              className="btn-block"
              onClick={onSubmit}
              variant="dark"
            >
              Continue to Payment
            </Button>
          </ListGroup.Item>
        ) : (
          <ListGroup.Item style={{ display: "grid" }}>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={handleCheckoutButton}
              variant="dark"
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};

export default CartSummary;
