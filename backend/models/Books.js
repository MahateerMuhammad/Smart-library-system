const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    Author: { type: String, required: true },
    ISBNnumber: { type: String, required: true, unique: true },
    publishedYear: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Books', bookSchema);

