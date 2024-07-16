import { Nav } from "react-bootstrap";

const CheckoutProgressTracker = ({ shipping, reviewOrder }) => {
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
          {reviewOrder ? (
            <Nav.Link
              href="/payment"
              style={{ color: "black", fontWeight: "bold", cursor: "default" }}
              variant="dark"
              disabled
            >
              Review Order
            </Nav.Link>
          ) : (
            <Nav.Link disabled>Review Order</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
  );
};

export default CheckoutProgressTracker;
