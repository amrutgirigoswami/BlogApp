const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');

// env config
dotenv.config();

// Routes
const userRoutes = require('./Routes/userRoutes');
const blogRoutes = require('./Routes/blogRoutes');
// Mongodb connection
connectDB();


const app = express();

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


// Routes 
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

// Port
const PORT = process.env.PORT || 8080;

// Lisent
app.listen(PORT, () => {
    console.log(`Server is Running on ${process.env.DEV_MODE} mode and Port:${PORT}`.bgCyan.white);
})