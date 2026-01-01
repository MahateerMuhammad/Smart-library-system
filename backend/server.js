const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/api/books', require('./routes/books'));


app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from MongoDB/Express Backend!' });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack_db';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
