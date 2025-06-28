// queries.js - MongoDB queries for PLP Bookstore assignment

// 1. BASIC CRUD OPERATIONS

// CREATE - Insert new books
db.books.insertOne({
  title: "The Silent Patient",
  author: "Alex Michaelides",
  genre: "Thriller",
  published_year: 2019,
  price: 14.99,
  in_stock: true,
  pages: 336,
  publisher: "Celadon Books"
});

// READ - Find documents
// Find all books
db.books.find();

// Find books by genre (Fiction)
db.books.find({ genre: "Fiction" });

// Find books published after 1950
db.books.find({ published_year: { $gt: 1950 } });

// Find books by specific author
db.books.find({ author: "George Orwell" });

// UPDATE - Modify documents
// Update price for a specific book
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 12.99 } }
);

// Mark all books with less than 200 pages as in stock
db.books.updateMany(
  { pages: { $lt: 200 } },
  { $set: { in_stock: true } }
);

// DELETE - Remove documents
// Delete a specific book by title
db.books.deleteOne({ title: "Animal Farm" });

// Delete all books not in stock
db.books.deleteMany({ in_stock: false });

// 2. ADVANCED QUERIES

// Find books that are both in stock and published after 2010
db.books.find({
  $and: [
    { in_stock: true },
    { published_year: { $gt: 2010 } }
  ]
});

// Projection - Return only title, author and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

// Sorting - By price (ascending and descending)
db.books.find().sort({ price: 1 }); // Ascending
db.books.find().sort({ price: -1 }); // Descending

// Pagination - 5 books per page (page 2)
db.books.find()
  .skip(5) // Skip first 5 for page 2
  .limit(5);

// 3. AGGREGATION PIPELINES

// Average price by genre
db.books.aggregate([
  { 
    $group: { 
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  },
  { $sort: { averagePrice: -1 } }
]);

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

// Books count by publication decade
db.books.aggregate([
  {
    $project: {
      decade: {
        $subtract: [
          "$published_year",
          { $mod: ["$published_year", 10] }
        ]
      }
    }
  }, 
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

// 4. INDEXING

// Create index on title field
db.books.createIndex({ title: 1 });

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Demonstrate index usage with explain()
db.books.find({ title: "1984" }).explain("executionStats");
db.books.find({ author: "J.R.R. Tolkien" }).explain("executionStats");