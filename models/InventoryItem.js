import { Schema, model } from 'mongoose';

const InventoryItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  reorderLevel: { type: Number, required: true }
});

export default model('InventoryItem', InventoryItemSchema);
