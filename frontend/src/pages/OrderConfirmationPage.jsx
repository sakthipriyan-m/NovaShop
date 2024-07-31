import React from "react";
import { useSelector } from "react-redux";
import { useGetOrderQuery } from "../slices/orderApiSlice";
import { Link, useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";
import "./Styles.css";

const OrderConfirmationPage = () => {
  const { orderId } = useParams(); // Extract orderId from URL params
  const { data: order, isLoading, error } = useGetOrderQuery(orderId);
  const { userInfo } = useSelector((state) => state.login);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;


  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleOrderDetails = () => {
    navigate(`/login?redirect=/order/${orderId}`);
  };

  return (
    <Container className="order-confirmation text-center">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <img
            title="transaction_successful.gif"
            src="https://salesport.in/sakhi/static/img/png/success.gif"
            alt="Success"
            className="success-gif"
            draggable="false"
          />
          <h1>Thank you for your order, {userInfo.firstName}!</h1>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <p>
            Order Number:{" "}
            <Link to={`/login?redirect=/order/${order.orderId}`}>#{order.orderId}</Link>
          </p>{" "}
          <p>
            A confirmation mail will be sent to you at {userInfo.email} with
            your complete order details.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={12} className="mb-2">
          <Button
            variant="light"
            className="w-auto"
            onClick={handleOrderDetails}
          >
            View Order Details
          </Button>
        </Col>
        <Col xs={12} md={12} className="mt-2">
          <Button
            variant="dark"
            className="w-auto"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmationPage;
