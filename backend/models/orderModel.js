import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        brand: { type: String },
        category: { type: String },
        description: { type: String },
        quantity: { type: Number, required: true },
        image: { type: String },
        priceInfo: { type: Number, required: true },
        createdBy: {type: String},
        productId: {
          type: String,
          required: true,
          ref: "Product",
        },
      },
    ],
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String },
      city: { type: String, required: true },
      postalCode: { type: String, required: true, maxlength: 6 },
      state: { type: String, required: true },
      country: { type: String, required: true },
      phoneNumber: { type: Number, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      type: Object,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
