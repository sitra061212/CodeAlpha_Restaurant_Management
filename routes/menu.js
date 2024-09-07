import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import MenuItem from '../models/MenuItem.js';

// Create a new menu item (admin only)
router.post('/', auth('admin'), async (req, res) => {
  const { name, price, description, category, inStock } = req.body;

  try {
    const newItem = new MenuItem({ name, price, description, category, inStock });
    const menuItem = await newItem.save();
    res.json(menuItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all menu items (no role required)
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get menu item by ID (no role required)
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ msg: 'Menu item not found' });
    res.json(menuItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update menu item by ID (admin only)
router.put('/:id', auth('admin'), async (req, res) => {
  const { name, price, description, category, inStock } = req.body;

  try {
    let menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ msg: 'Menu item not found' });

    menuItem.name = name || menuItem.name;
    menuItem.price = price || menuItem.price;
    menuItem.description = description || menuItem.description;
    menuItem.category = category || menuItem.category;
    menuItem.inStock = inStock !== undefined ? inStock : menuItem.inStock;

    await menuItem.save();
    res.json(menuItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete menu item by ID (admin only)
router.delete('/:id', auth('admin'), async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ msg: 'Menu item not found' });

    await menuItem.remove();
    res.json({ msg: 'Menu item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
