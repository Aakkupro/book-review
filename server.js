const express = require('express');
const cors = require('cors');
const db = require('./models'); // Importing Sequelize models
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the book-cover directory
app.use('/book-cover', express.static(path.join(__dirname, 'book-cover')));

// Sync the database and create tables
db.sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

// Routes

// GET all books
app.get('/books', async (req, res) => {
  try {
    const books = await db.Book.findAll(); // Fetch all books
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
});

// GET a specific book by id and its reviews
app.get('/books/:id', async (req, res) => {
  try {
    const book = await db.Book.findByPk(req.params.id, {
      include: db.Review // Include reviews
    });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve book details' });
  }
});

// GET all reviews for a specific book
app.get('/books/:id/reviews', async (req, res) => {
  try {
    const reviews = await db.Review.findAll({
      where: { book_id: req.params.id }
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
});

// POST a new review for a specific book
app.post('/books/:id/reviews', async (req, res) => {
  const { rating, comment } = req.body;
  
  console.log('Received review:', { book_id: req.params.id, rating, comment }); // Log incoming data

  if (typeof rating !== 'number' || typeof comment !== 'string') {
    return res.status(400).json({ error: 'Invalid data' });
  }

  try {
    const newReview = await db.Review.create({
      book_id: req.params.id,
      rating,
      comment
    });
    res.status(201).json(newReview); // 201 indicates that a resource was created
  } catch (error) {
    console.error('Error creating review:', error); // Log error details
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
