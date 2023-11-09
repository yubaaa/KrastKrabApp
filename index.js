// index.js
const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

app.get('/', (req, res) => {
  res.send('Welcome to the Krusty Krab!');
});

client.connect((err, db) => {
  if (err || !db) {
    return console.error('MongoDB connection failed', err);
  }

  dbConnection = db.db('krustyKrabDB');
  console.log('Connected to MongoDB');
});

// ... rest of your Express server code


// Create a new recipe
app.post('/recipes', async (req, res) => {
    const recipe = req.body;
    const collection = dbConnection.collection('krusty-krab');
    
    try {
      await collection.insertOne({ documentType: "recipes", items: recipe });
      res.status(201).send({ message: "Recipe created", recipe });
    } catch (error) {
      res.status(500).send({ message: "Failed to create recipe", error });
    }
  });
  
  // ... similarly define endpoints for reading, updating, and deleting recipes and employees
  