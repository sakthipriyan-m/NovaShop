import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, ListGroup, Button } from "react-bootstrap";

const CartSummary = ({ showShippingPrice, onSubmit, reviewOrder }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingPrice, taxPrice, totalPrice, paymentMethod } = cart;

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.listPrice, 0);
  const shipping = parseFloat(shippingPrice) || 0;
  const tax = parseFloat(taxPrice) || 0;
  const total = subtotal + shipping;
  const orderTotal = parseFloat(totalPrice) || 0;
  //Minimum spend to get free shipping charge
  const freeShippingThreshold = 1000;
  const remainingAmount = freeShippingThreshold - subtotal;

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
        <h4>{location.pathname === "/order-review" ? "Order Summary" : "Summary"}</h4>
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
            <span style={{ float: "right" }}>&#8377; {subtotal.toFixed(2)}</span>
          </h5>
        </ListGroup.Item>
        {location.pathname !== "/cart" && (
          <>
            <ListGroup.Item>
              <h5>
                Shipping:{" "}
                <span style={{ float: "right" }}>&#8377; {shipping.toFixed(2)}</span>
              </h5>
              {remainingAmount > 0 && remainingAmount <= freeShippingThreshold && (
                <div style={{ fontSize: "14px", color: "#888" }}>
                  Buy &#8377; {remainingAmount.toFixed(2)} more to get free shipping!
                </div>
              )}
            </ListGroup.Item>
            {location.pathname === "/review-order" && (
              <ListGroup.Item>
                <h5>
                  Tax:{" "}
                  <span style={{ float: "right" }}> &#8377; {tax.toFixed(2)}</span>
                </h5>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <h5>
                Total:{" "}
                <span style={{ float: "right" }}>
                  {location.pathname === "/review-order"
                    ? `\u20B9  ${orderTotal.toFixed(2)}`
                    : `\u20B9 ${total.toFixed(2)}`}
                </span>
              </h5>
            </ListGroup.Item>
          </>
        )}
        <ListGroup.Item style={{ display: "grid" }}>
          {reviewOrder ? (
            <Button
              type="button"
              className="btn-block mt-2"
              variant="dark"
              disabled={!paymentMethod}
            >
              Place Order
            </Button>
          ) : (
            <Button
              type="button"
              className="btn-block"
              onClick={showShippingPrice ? onSubmit : handleCheckoutButton}
              variant="dark"
              disabled={!showShippingPrice && cartItems.length === 0}
            >
              {showShippingPrice ? "Continue to Payment" : "Proceed To Checkout"}
            </Button>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CartSummary;
