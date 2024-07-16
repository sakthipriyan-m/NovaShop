import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col } from "react-bootstrap";
import { savePaymentMethod } from "../slices/cartSlice";
import "../index.css";

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  const { paymentMethod } = cart;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethod || "");

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPaymentMethod) {
      dispatch(savePaymentMethod(selectedPaymentMethod));
    }
  }, [selectedPaymentMethod, dispatch]);

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  return (
    <Form.Group>
      <Form.Label as="legend">
        <strong>Payment</strong>
      </Form.Label>
      <Col>
        <Form.Check
          type="radio"
          className="my-2 custom-radio"
          label="PayPal or Credit Card"
          id="PayPal"
          name="paymentMethod"
          value="PayPal"
          checked={selectedPaymentMethod === "PayPal"}
          onChange={handlePaymentMethodChange}
        ></Form.Check>
        <Form.Check
          type="radio"
          className="my-2 custom-radio"
          label="Cash on Delivery"
          id="cashOnDelivery"
          name="paymentMethod"
          value="cashOnDelivery"
          checked={selectedPaymentMethod === "cashOnDelivery"}
          onChange={handlePaymentMethodChange}
        ></Form.Check>
      </Col>
    </Form.Group>
  );
};

export default Payment;
