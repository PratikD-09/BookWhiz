const express = require('express')
const app = express()
const mongoose = require('mongoose');
const authRoutes =require('./Routes/auth')
const userRoutes =require('./Routes/user')
const bookRoutes =require('./Routes/book')
const cartRoutes =require('./Routes/cart')
const orderRoutes =require('./Routes/order')
const cors = require("cors"); // Import CORS



require('dotenv').config()
app.use(express.json());



mongoose.connect(process.env.DB_URL,)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 
app.use(cors({
  origin: "http://localhost:5173", // Allow only this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true // If sending cookies or authentication tokens
}));


app.use('/api/users', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);



app.listen(process.env.PORT || 5000 , ()=> console.log('> Server is up and running '))