const db = require('./models');

const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A novel set in the Roaring Twenties that explores themes of wealth, class, and the American Dream.",
      image: "Gatsby.jpg"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A classic novel set in the Depression-era South, addressing serious issues like racial injustice and moral growth.",
      image: "Tokill.jpg"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      description: "A dystopian novel that delves into the dangers of totalitarianism and oppressive regimes.",
      image: "the1984.jpg"
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      description: "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
      image: "pride.jpg"
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      description: "A story about teenage angst and alienation, following the life of Holden Caulfield.",
      image: "catcher.jpeg"
    },
    {
      id: 6,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      description: "A fantasy novel that follows the adventures of Bilbo Baggins as he embarks on a quest to reclaim a lost kingdom.",
      image: "hobbit.jpg"
    },
    {
      id: 7,
      title: "Moby-Dick",
      author: "Herman Melville",
      description: "An epic tale of obsession and revenge, centering on the quest to hunt the white whale, Moby Dick.",
      image: "moby.jpg"
    },
    {
      id: 8,
      title: "The Odyssey",
      author: "Homer",
      description: "An ancient Greek epic poem that narrates the adventures of Odysseus as he tries to return home from the Trojan War.",
      image: "odyssey.jpeg"
    },
    {
      id: 9,
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      description: "A novel about the experiences and struggles of the orphaned Jane Eyre as she grows into adulthood.",
      image: "jane.jpg"
    },
    {
      id: 10,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      author: "J.R.R. Tolkien",
      description: "The first part of Tolkien's epic fantasy trilogy, which introduces the quest to destroy the One Ring.",
      image: "fellowship.jpeg"
    }
  ];
  

  const reviews = [
    // Add some sample review data here
    {
      rating: 5,
      comment: 'Amazing book!',
      book_id: 1
    },
    {
      rating: 4,
      comment: 'Great read, but a bit lengthy.',
      book_id: 2
    },
    {
        rating: 5,
        comment: 'Amazing book!',
        book_id: 3
      },
      {
        rating: 4,
        comment: 'Great read, but a bit lengthy.',
        book_id: 4
      },
      {
        rating: 5,
        comment: 'Amazing book!',
        book_id: 5
      },
      {
        rating: 4,
        comment: 'Great read, but a bit lengthy.',
        book_id: 6
      },
      {
          rating: 5,
          comment: 'Amazing book!',
          book_id: 7
        },
        {
          rating: 4,
          comment: 'Great read, but a bit lengthy.',
          book_id: 8
        },
        {
            rating: 5,
            comment: 'Amazing book!',
            book_id: 9
          },
          {
            rating: 4,
            comment: 'Great read, but a bit lengthy.',
            book_id: 10
          }
  ];
  

  const seedDatabase = async () => {
    try {
      // Clear existing data
      await db.Book.destroy({ where: {} });
      await db.Review.destroy({ where: {} });
  
      // Insert new data
      await db.Book.bulkCreate(books);
      await db.Review.bulkCreate(reviews);
  
      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding the database:', error);
    }
  };
  
  seedDatabase();
