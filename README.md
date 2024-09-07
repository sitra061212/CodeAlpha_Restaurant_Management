# Restaurant Management System

A backend system built using Node.js,Express.js, and MongoDB to manage various aspects of a restaurant, including user authentication, menu management, orders, reservations, and inventory.

## Features

- User Authentication (Registration & Login) using JWT.
- CRUD operations for Menu Items.
- Order management (creating, viewing, updating orders).
- Reservation system for tables.
- Inventory management for tracking stock levels.
- Role-based access control for staff and admin functions.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM library for MongoDB.
- **JWT (jsonwebtoken)**: For authentication and authorization.
- **Bcrypt.js**: For hashing user passwords.

## Installation and Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps to Install

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/restaurant-management.git
   cd restaurant-management
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables in a `.env` file:
   ```
   JWT_SECRET=your_jwt_secret
   MONGO_URI=mongodb://localhost:27017/restaurantmanagement
   ```

4. Start the server:
   ```
   npm start
   ```
   The server will run on `http://localhost:3000`.

### Directory Structure

```
restaurant-management/
├── config/
│   └── db.js             # MongoDB connection setup
├── models/               # Mongoose models for data schema
│   ├── User.js
│   ├── MenuItem.js
│   ├── Order.js
│   ├── Reservation.js
│   └── InventoryItem.js
├── routes/               # API routes
│   ├── auth.js
│   ├── menu.js
│   ├── orders.js
│   ├── reservations.js
│   └── inventory.js
├── middleware/
│   └── auth.js           # Authentication middleware
├── .gitignore            # Ignored files
├── package.json          # Project dependencies
├── server.js             # Application entry point
└── README.md             # Project documentation
```

### API Endpoints

#### Authentication

- **Register a user**: `POST /api/auth/register`
- **Login a user**: `POST /api/auth/login`

#### Menu Management

- **Create a menu item**: `POST /api/menu`
- **Get all menu items**: `GET /api/menu`
- **Get a menu item by ID**: `GET /api/menu/:id`
- **Update a menu item by ID**: `PUT /api/menu/:id`
- **Delete a menu item by ID**: `DELETE /api/menu/:id`

#### Order Management

- **Create an order**: `POST /api/orders`
- **Get all orders (admin only)**: `GET /api/orders`
- **Get orders for a user**: `GET /api/orders/my-orders`
- **Update order status**: `PUT /api/orders/:id`

#### Reservation System

- **Create a reservation**: `POST /api/reservations`
- **Get all reservations (admin only)**: `GET /api/reservations`
- **Get reservations for a user**: `GET /api/reservations/my-reservations`
- **Update reservation status**: `PUT /api/reservations/:id`

#### Inventory Management

- **Create an inventory item**: `POST /api/inventory`
- **Get all inventory items**: `GET /api/inventory`
- **Update inventory item**: `PUT /api/inventory/:id`
- **Delete inventory item**: `DELETE /api/inventory/:id`

## Testing the API

- **Register a User**:
  ```
  POST /api/auth/register
  Body: { "name": "John Doe", "email": "john@example.com", "password": "123456", "role": "admin" }
  ```

- **Login**:
  ```
  POST /api/auth/login
  Body: { "email": "john@example.com", "password": "123456" }
  ```

- **Create a Menu Item**:
  ```
  POST /api/menu
  Body: { "name": "Pasta", "price": 12.99, "description": "Delicious pasta", "category": "Main Course", "inStock": true }
  ```
