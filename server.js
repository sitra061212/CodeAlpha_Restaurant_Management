import express, { json } from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import ordersRoutes from './routes/orders.js';
import reservationsRoutes from './routes/reservations.js';
import inventoryRoutes from './routes/inventory.js';

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/inventory', inventoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
