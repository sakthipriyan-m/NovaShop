import { Nav } from "react-bootstrap";

const CheckoutProgressTracker = ({ shipping, payment, review }) => {
  return (
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {shipping ? (
            <Nav.Link
              href="/shipping"
              style={{ color: "black", fontWeight: "bold", cursor: "default" }}
              variant="dark"
              disabled
            >
              Shipping
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {payment ? (
            <Nav.Link
              href="/payment"
              style={{ color: "black", fontWeight: "bold", cursor: "default" }}
              variant="dark"
              disabled
            >
              Payment
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {review ? (
            <Nav.Link
              href="/review"
              style={{ color: "black", fontWeight: "bold", cursor: "default"}}
              variant="dark"
            >
              Review
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Review</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
  );
};

export default CheckoutProgressTracker;
