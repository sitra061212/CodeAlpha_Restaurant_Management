import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';

// Create a new order (authenticated users)
router.post('/', auth(), async (req, res) => {
  console.log('Incoming Request:', req.body);  // Log request body
  const { items } = req.body;

  try {
    let totalPrice = 0;

    // Parallelize menu item lookups
    const menuItems = await Promise.all(items.map(item => MenuItem.findById(item.menuItem)));

    // Check if any menu item is not found
    for (let i = 0; i < menuItems.length; i++) {
      if (!menuItems[i]) {
        return res.status(404).json({ msg: `Menu item with ID ${items[i].menuItem} not found` });
      }
    }

    // Calculate total price and prepare order items
    const orderItems = items.map((item, index) => {
      totalPrice += menuItems[index].price * item.quantity;
      return { menuItem: menuItems[index].id, quantity: item.quantity };
    });

    // Create and save new order
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
router.get('/', auth('admin'), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', ['name'])  // Populate user details
      .populate('items.menuItem', ['name', 'price']);  // Populate menu item details
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get current user's orders (authenticated users)
router.get('/my-orders', auth(), async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.menuItem', ['name', 'price']);  // Populate menu item details
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update order status by ID (admin only)
router.put('/:id', auth('admin'), async (req, res) => {
  const { status } = req.body;

  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    // Update the order status
    order.status = status || order.status;

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
