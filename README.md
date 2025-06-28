# MongoDB Fundamentals Assignment

## Project Setup Instructions

### Prerequisites
- MongoDB Community Server (version 8.0.11)
- Node.js (version 18 or higher)
- MongoDB Shell (mongosh version 2.5.3)

### Installation Steps
1. Install MongoDB from: https://www.mongodb.com/try/download/community
2. Install Node.js from: https://nodejs.org/
3. Install MongoDB Shell from: https://www.mongodb.com/try/download/shell

### How to Run the Project
1. Open Command Prompt in your project folder
2. First install the required MongoDB package:
   ```
   npm install mongodb
   ```
3. Then run the script to insert book data:
   ```
   node insert_books.js
   ```

## Working with the Database

### Starting MongoDB
1. Open one Command Prompt window and run:
   ```
   mongod
   ```
2. Open another Command Prompt window to run commands:
   ```
   mongosh
   ```

### Basic Commands
To see all databases:
```
show dbs
```

To use your bookstore database:
```
use plp_bookstore
```

To see all books:
```
db.books.find()
```

To see the first 5 books:
```
db.books.find().limit(5)
```

## What I Accomplished
1. Successfully set up MongoDB and inserted book data
2. Performed database operations including:
   - Inserting new books
   - Finding specific books
   - Deleting books
3. Created multiple documents in the database

## Challenges I Faced
1. Initially got errors when trying to run MongoDB commands because:
   - I needed to use "mongosh" instead of "mongo"
   - Solution: Installed the correct MongoDB Shell version

2. Had issues with npm not finding package.json
   - Solution: Ran `npm install mongodb` first to create node_modules

3. Needed to drop and recreate the collection
   - Solution: The insert_books.js script automatically handles this

## Files in This Project
- `insert_books.js` - Script that inserts the initial book data
- `queries.js` - Contains all MongoDB queries I ran (to be completed)
- Screenshots of my working database (to be added)

## Verification
To verify all books were inserted correctly:
1. Connect to mongosh
2. Run:
   ```
   use plp_bookstore
   db.books.countDocuments({})
   ```
   This should return 12 (the number of books inserted)

To see the indexes:
```
db.books.getIndexes()
```