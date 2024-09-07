import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';

// Create a new order
router.post('/', auth, async (req, res) => {
  const { items } = req.body;

  try {
    let totalPrice = 0;
    const orderItems = [];

    for (let item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) return res.status(404).json({ msg: 'Menu item not found' });
      totalPrice += menuItem.price * item.quantity;
      orderItems.push({ menuItem: menuItem.id, quantity: item.quantity });
    }

    const newOrder = new Order({
      user: req.user.id,
      items: orderItems,
      totalPrice
    });

    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all orders (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

    const orders = await Order.find().populate('user', ['name']).populate('items.menuItem', ['name', 'price']);
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get orders by user
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.menuItem', ['name', 'price']);
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update order status by ID (admin only)
router.put('/:id', auth, async (req, res) => {
  const { status } = req.body;

  try {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = status || order.status;

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
