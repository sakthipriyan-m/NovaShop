import mongoose from "mongoose";
const createdBySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    ref: "User",
  },
  email: {
    type: String,
    required: true,
    ref: "User",
  },
  firstName: {
    type: String,
    required: true,
    ref: "User",
  },
  lastName: {
    type: String,
    required: true,
    ref: "User",
  }
});

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    createdBy: createdBySchema,
    id: {
      type: String,
      required: true,
      minlength: 1,
    },
    name: {
      type: String,
      required: true,
      minlength: 1,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    listPrice: {
      type: Number,
      required: true,
      min: 0.01,
    },
    salePrice: {
      type: Number,
      min: 0.01,
    },
    salePriceEndDate: {
      type: Date,
    },
    active: Boolean,
    arrivalDate: Date,
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
      min: 0,
    },
    orderLimit: {
      type: Number,
      min: 0,
    },
    shippable: {
      type: Boolean,
    },
    onSale: Boolean,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
