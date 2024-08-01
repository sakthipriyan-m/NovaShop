import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import stripe from "stripe";
dotenv.config();
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);


const generateNextOrderId = async () => {

  const lastOrder = await Order.findOne({}, { orderId: 1 }).sort({ orderId: -1 });

  if (!lastOrder) {
    // No existing orders, start with a default order number
    return 'o900001';
  }
  const lastOrderNumber = parseInt(lastOrder?.orderId.slice(1));

  const nextOrderNumber = lastOrderNumber + 1;
  return `o${nextOrderNumber}`;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!cartItems || cartItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const orderId = await generateNextOrderId();
    const isPaid = paymentResult?.success ? true : false;
    const newOrder = new Order({
      orderId,
      orderItems: cartItems.map((x) => ({
        ...x,
        productId: x.id,
        priceInfo: x.listPrice,
        createdBy: x.createdBy.id,
        _id: undefined,
      })),
      user: req.user.userId,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,

    });

    const createdOrder = await newOrder.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Verify Payment
// @route   POST /api/orders/verify-payment
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const { token, amount } = req.body;

  try {
    const charge = await stripeClient.charges.create({
      amount: parseInt(amount * 100),
      currency: "INR",
      source: token.id,
      description: "Order Payment",
    });

    if (charge.status === "succeeded") {
      res.status(200).json({ success: true, charge });
    } else {
      res.status(400).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
const orders = await Order.find({user: req.user.userId});
res.status(200).json(orders);
});

// @desc    Get order By ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
const order = await Order.findOne({orderId:req.params.id}).populate({
      path: 'user',
      select: 'firstName lastName email -_id',
      model: User,
      foreignField: 'userId',
      localField: 'user'
    });
if(order){
  res.status(200).json(order);
}else{
  res.status(404);
  throw new Error('Order not found');
}
});

// @desc    Update order to Paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update order to paid");
});

// @desc    Update order to Delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  verifyPayment,
};
