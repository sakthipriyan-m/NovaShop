import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
connectDB();

const PORT = process.env.PORT || 5050;
const app = express();

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.send('API is running....');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));