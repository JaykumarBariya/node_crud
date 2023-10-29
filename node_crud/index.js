// index.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const booksRouter = require('./routes/books');
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Use the book routes
app.use('/api/books', booksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
