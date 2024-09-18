import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5001/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error('Error fetching book details:', error));

    fetch(`http://localhost:5001/books/${id}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching reviews:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = { rating: Number(rating), comment };

    fetch(`http://localhost:5001/books/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Review submitted:', data); // Log the submitted review
        setReviews([...reviews, data]); // Add the new review to the list
        setRating(0); // Reset form fields
        setComment('');
      })
      .catch((error) => console.error('Error submitting review:', error));
  };

  return (
    <div className="book-details-page container">
      <h1>{book.title}</h1>
      <p>by {book.author}</p>
      <p>{book.description}</p>
      <img src={`http://localhost:5001/book-cover/${book.image}`} alt={book.title} className="book-image" />

      <h2>Reviews</h2>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <li key={index}>
              <p>Rating: {review.rating}</p>
              <p>{review.comment}</p>
            </li>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </ul>

      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </label>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default BookDetailsPage;
