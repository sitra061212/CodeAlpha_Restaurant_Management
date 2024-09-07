import { Schema, model } from 'mongoose';

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true }
});

export default model('MenuItem', MenuItemSchema);
