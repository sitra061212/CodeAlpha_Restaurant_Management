import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import Reservation from '../models/Reservation.js';

// Create a new reservation (authenticated users)
router.post('/', auth(), async (req, res) => {
  const { tableNumber, date, time, guests } = req.body;

  try {
    const newReservation = new Reservation({
      user: req.user.id,  
      tableNumber,
      date,
      time,
      guests
    });

    const reservation = await newReservation.save();
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all reservations (admin only)
router.get('/', auth('admin'), async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('user', ['name']);  
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get current user's reservations (authenticated users)
router.get('/my-reservations', auth(), async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id });
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update reservation status by ID (admin only)
router.put('/:id', auth('admin'), async (req, res) => {
  const { status } = req.body;

  try {
    let reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ msg: 'Reservation not found' });

    reservation.status = status || reservation.status;

    await reservation.save();
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
