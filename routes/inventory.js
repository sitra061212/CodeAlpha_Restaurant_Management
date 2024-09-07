import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import InventoryItem from '../models/InventoryItem.js';

// Create a new inventory item (admin only)
router.post('/', auth('admin'), async (req, res) => {
  const { name, quantity, unit, reorderLevel } = req.body;

  try {
    const newItem = new InventoryItem({ name, quantity, unit, reorderLevel });
    const inventoryItem = await newItem.save();
    res.json(inventoryItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all inventory items (admin or user)
router.get('/', auth(), async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res.json(inventoryItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update inventory item by ID (admin only)
router.put('/:id', auth('admin'), async (req, res) => {
  const { name, quantity, unit, reorderLevel } = req.body;

  try {
    let inventoryItem = await InventoryItem.findById(req.params.id);
    if (!inventoryItem) return res.status(404).json({ msg: 'Inventory item not found' });

    if (name) inventoryItem.name = name;
    if (quantity) inventoryItem.quantity = quantity;
    if (unit) inventoryItem.unit = unit;
    if (reorderLevel) inventoryItem.reorderLevel = reorderLevel;

    await inventoryItem.save();
    res.json(inventoryItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete inventory item by ID (admin only)
// Delete inventory item by ID (admin only)
router.delete('/:id', auth('admin'), async (req, res) => {
  try {
    const inventoryItem = await InventoryItem.findById(req.params.id);
    if (!inventoryItem) return res.status(404).json({ msg: 'Inventory item not found' });

    // Use findByIdAndDelete to delete the item
    await InventoryItem.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Inventory item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


export default router;
