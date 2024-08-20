import React from "react";
import { Link, useParams } from "react-router-dom";
import moment from 'moment';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader/Loader";
import { useGetOrderQuery } from "../slices/orderApiSlice";

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderQuery(orderId);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1>Order - #{order.orderId}</h1>
      <Row>
        <Col md={8}>
          <Row>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>
                    {order?.user?.firstName} {order?.user?.lastName}
                    <br />
                    <strong>Email: </strong>
                    {order?.user?.email}
                    <br />
                    <strong>Address: </strong>
                    {order?.shippingAddress?.address}, <br />
                    {order?.shippingAddress?.address2 && (
                      <>
                        {order?.shippingAddress?.address2}, <br />
                      </>
                    )}
                    {order?.shippingAddress?.city},{" "}
                    {order?.shippingAddress?.state},{" "}
                    {order?.shippingAddress?.country} -&nbsp;
                    {order?.shippingAddress?.postalCode}
                    <br />
                    <strong>Contact: </strong>
                    {order?.shippingAddress?.phoneNumber}
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod === "cashOnDelivery"
                      ? "Cash on delivery"
                      : "Card"}
                  </p>
                  {order.isPaid ? (
                    <p>
                      <strong>Payment Status: </strong>Paid
                    </p>
                  ) : (
                    <p>
                      <strong>Payment Status: </strong>Not Paid
                    </p>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <ListGroup.Item>
  <Row className="d-flex flex-column flex-md-row">
    <Col className="mb-2 mb-md-0">
      <p>
        <strong>Order Date: </strong>
        {moment(order.createdAt).format("DD-MM-YYYY")}
      </p>
    </Col>
    <Col>
      <p>
        <strong>Order Status: </strong>
        {order.isDelivered ? "Delivered" : "Not Delivered"}
      </p>
    </Col>
  </Row>
</ListGroup.Item>

          <hr />
          <Row className="mt-3">
            <Col>
              <h2>Order Items</h2>
              <Card>
                <ListGroup variant="flush">
                  {/* Header Row (hidden on small screens) */}
                  <ListGroup.Item className="d-none d-md-block">
                    <Row>
                      <Col md={2}>
                        <strong>Image</strong>
                      </Col>
                      <Col md={6}>
                        <strong>Name</strong>
                      </Col>
                      <Col md={2}>
                        <strong>Quantity</strong>
                      </Col>
                      <Col md={2}>
                        <strong>Price</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* Order Items */}
                  {order?.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="d-md-none">
                        <Col>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>

                          <Row className="mt-2">
                            <Col xs={6}>Quantity:</Col>
                            <Col xs={6} className="text-end">
                              {item.quantity}
                            </Col>
                          </Row>

                          <Row>
                            <Col xs={6}>Price:</Col>
                            <Col xs={6} className="text-end">
                              &#8377; {item.quantity * item.priceInfo}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="d-none d-md-flex">
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={6}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>{item.quantity}</Col>
                        <Col md={2}>
                          &#8377; {item.quantity * item.priceInfo}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              <h4>Order Summary</h4>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>
                  Total Items:{" "}
                  <span style={{ float: "right" }}>
                    {order?.orderItems?.length}
                  </span>
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>
                  Subtotal:{" "}
                  <span style={{ float: "right" }}>
                    &#8377; {order?.itemsPrice}
                  </span>
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>
                  Shipping:{" "}
                  <span style={{ float: "right" }}>
                    &#8377; {order?.shippingPrice.toFixed(2)}
                  </span>
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>
                  Tax:{" "}
                  <span style={{ float: "right" }}>
                    {" "}
                    &#8377; {order?.taxPrice.toFixed(2)}
                  </span>
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>
                  Total:{" "}
                  <span style={{ float: "right" }}>
                    &#8377; {order?.totalPrice}
                  </span>
                </h5>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailsPage;
