import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import InventoryItem from '../models/InventoryItem.js';

// Create a new inventory item
router.post('/', auth, async (req, res) => {
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

// Get all inventory items
router.get('/', auth, async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res.json(inventoryItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update inventory item by ID
router.put('/:id', auth, async (req, res) => {
  const { name, quantity, unit, reorderLevel } = req.body;

  try {
    let inventoryItem = await InventoryItem.findById(req.params.id);
    if (!inventoryItem) return res.status(404).json({ msg: 'Inventory item not found' });

    inventoryItem.name = name || inventoryItem.name;
    inventoryItem.quantity = quantity || inventoryItem.quantity;
    inventoryItem.unit = unit || inventoryItem.unit;
    inventoryItem.reorderLevel = reorderLevel || inventoryItem.reorderLevel;

    await inventoryItem.save();
    res.json(inventoryItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete inventory item by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const inventoryItem = await InventoryItem.findById(req.params.id);
    if (!inventoryItem) return res.status(404).json({ msg: 'Inventory item not found' });

    await inventoryItem.remove();
    res.json({ msg: 'Inventory item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
