import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
connectDB();

const PORT = process.env.PORT || 5050;
const app = express();

app.get('/', (req, res)=> {
    res.send('API is running....');
});

app.use('/api/products', productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));