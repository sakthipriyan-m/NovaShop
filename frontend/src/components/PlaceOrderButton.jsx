import React from "react";
import { Button } from "react-bootstrap";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "../slices/orderApiSlice";
import { clearCartItems, savePaymentMethod } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";

const PlaceOrderButton = ({ disabled, setLoading }) => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const placeOrderHandler = async (paymentResult) => {
    setLoading(true);
    try {
      const response = await createOrder({
        cartItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        paymentResult,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/login?redirect=/order-confirmation/${response.orderId}`);
      toast.success(`${response.orderId} is Placed Successfully`);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentResult) => {
    // Save payment result to cart state
    dispatch(savePaymentMethod(paymentResult));
    // Place order
    placeOrderHandler(paymentResult);
  };
  const onToken = async (token) => {
    setLoading(true);
    try {
      const paymentData = {
        token,
        amount: cart.totalPrice,
      };
        // Verifying payment
      const verificationResult = await verifyPayment(paymentData).unwrap();

      if (verificationResult.success) {
        handlePaymentSuccess(verificationResult);
      } else {
        throw new Error(verificationResult.message || "Payment verification failed. Try again.");
      }
    } catch (error) {
      toast.error(error.data.message || "Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {cart.paymentMethod === "Card" ? (
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
          token={onToken}
          amount={cart.totalPrice * 100}
          currency="INR"
          email={cart.shippingAddress.email}
        >
          <Button
            type="button"
            className="btn-block mt-2 place-order-button"
            variant="dark"
            disabled={disabled}
          >
            Place Order
          </Button>
        </StripeCheckout>
      ) : (
        <Button
          type="button"
          className="btn-block mt-2 place-order-button"
          variant="dark"
          onClick={() => placeOrderHandler(null)}
          disabled={disabled}
        >
          Place Order
        </Button>
      )}
    </>
  );
};

export default PlaceOrderButton;
