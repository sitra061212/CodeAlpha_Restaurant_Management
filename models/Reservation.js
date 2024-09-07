import { Schema, model } from 'mongoose';

const ReservationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tableNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  status: { type: String, default: 'reserved' } // 'reserved', 'completed', 'cancelled'
});

export default model('Reservation', ReservationSchema);
