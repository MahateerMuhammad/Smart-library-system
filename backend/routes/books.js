const express = require('express');
const Books = require('../models/Books');
const router = express.Router();

//for fetching books data using get
router.get('/', async (req, res) => {
    try {
        const books = await Books.find().sort({ createdAt: -1 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch books', error: err.message });
    }
});


//for adding a new book using post
router.post('/', async (req, res) => {
    try {
        const { title, Author, ISBNnumber, publishedYear } = req.body;
        
        
        if (!title || !Author || !ISBNnumber || !publishedYear) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        
        const existingBook = await Books.findOne({ ISBNnumber });
        if (existingBook) {
            return res.status(400).json({ message: 'Book with this ISBN already exists' });
        }

        const book = new Books({ title, Author, ISBNnumber, publishedYear });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'Book with this ISBN already exists' });
        } else {
            res.status(500).json({ message: 'Failed to add book', error: err.message });
        }
    }
});

//for deleting a book using delete
router.delete('/:id', async (req, res) => {
    try {
        const book = await Books.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully', book });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete book', error: err.message });
    }
});

module.exports = router;
