// routes/books.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the books JSON file
const dataFilePath = path.join(__dirname, '..', 'data', 'books.json');

// Read all books
router.get('/', (req, res) => {
  try {
    const booksData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.json(booksData);
  } catch (error) {
    res.status(500).json({ error: 'Error reading books data' });
  }
});

// Create a new book
router.post('/', (req, res) => {
  try {
    const booksData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const newBook = req.body;
    newBook.id = Date.now(); // Generate a simple ID
    booksData.push(newBook);

    fs.writeFileSync(dataFilePath, JSON.stringify(booksData, null, 2));
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a new book' });
  }
});

// Update an existing book
router.put('/:id', (req, res) => {
  try {
    const booksData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;

    const index = booksData.findIndex(book => book.id === bookId);
    if (index === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }

    booksData[index] = { ...booksData[index], ...updatedBook };
    fs.writeFileSync(dataFilePath, JSON.stringify(booksData, null, 2));
    res.json(booksData[index]);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the book' });
  }
});

// Delete a book
router.delete('/:id', (req, res) => {
  try {
    const booksData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const bookId = parseInt(req.params.id);

    const index = booksData.findIndex(book => book.id === bookId);
    if (index === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const deletedBook = booksData.splice(index, 1);
    fs.writeFileSync(dataFilePath, JSON.stringify(booksData, null, 2));
    res.json(deletedBook[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the book' });
  }
});

module.exports = router;
