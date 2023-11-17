const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const User = require('./User.js');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.post('/submit', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Connect to the MongoDB database
    await mongoose.connect("mongodb://127.0.0.1:27017/");

    // Create a new user in the database
    const createdUser = await User.create({
      username: username,
      password: password
    });

    console.log(`User successfully inserted: ${createdUser}`);
  } catch (error) {
    console.error('Error creating user:', error);
    // Handle the error appropriately (e.g., send an error response)
    return res.status(500).send('Internal Server Error');
  }

  // Send the result.html file after the database operation
  res.sendFile(path.join(__dirname, 'src', 'result.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port number ${PORT}`);
});
