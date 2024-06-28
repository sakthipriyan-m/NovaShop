import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();


let nextUserId = 2000001;
const generateUserId = () => {
  const userId = nextUserId.toString();
  nextUserId++;
  return userId;
};

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Add userId to each user before insertion
    const usersWithIds = users.map(user => ({
      ...user,
      userId: generateUserId()
    }));

    const createdUsers = await User.insertMany(usersWithIds);
    const adminUser = createdUsers[0];

    const sampleProducts = products.map((product) => {
      return { ...product, createdBy: {
        id: adminUser.userId,
        email: adminUser.email,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName
      } };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
    try {
      await User.deleteMany();
      await Product.deleteMany();
      await Order.deleteMany();
  
      console.log("Data Destroyed!");
      process.exit();
    } catch (error) {
      console.error(`Error: ${error}`);
      process.exit(1);
    }
  };

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}