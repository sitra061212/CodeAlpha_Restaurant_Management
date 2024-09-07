import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending' } // 'pending', 'completed', 'cancelled'
});

export default model('Order', OrderSchema);
