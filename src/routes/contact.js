// routes/contact.js
const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/auth');
const ContactQuery = require('../models/ContactQuery');

// Submit a query
router.post('/query', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new query
    const newQuery = new ContactQuery({
      name,
      email,
      message,
    });

    // Save the query to the database
    await newQuery.save();

    res.status(201).    json({ message: 'Query submitted successfully' });
} catch (error) {
  console.error('Error submitting query:', error);
  res.status(500).json({ message: 'Error submitting query' });
}
});

// Get all queries (admin-only route)
router.get('/queries', async (req, res) => {
try {
  // Fetch all queries from the database
  const queries = await ContactQuery.find();
  res.json(queries);
} catch (error) {
  console.error('Error getting queries:', error);
  res.status(500).json({ message: 'Error getting queries' });
}
});

// Reply to a query (admin-only route)
router.post('/reply/:id', async (req, res) => {
try {
  const { id } = req.params;
  const { reply } = req.body;

  // Find the query by ID and update the reply
  await ContactQuery.findByIdAndUpdate(id, { reply });

  res.json({ message: 'Reply sent successfully' });
} catch (error) {
  console.error('Error replying to query:', error);
  res.status(500).json({ message: 'Error replying to query' });
}
});

// Delete a query (admin-only route)
router.delete('/query/:id', async (req, res) => {
try {
  const { id } = req.params;

  // Find the query by ID and delete it
  await ContactQuery.findByIdAndDelete(id);

  res.json({ message: 'Query deleted successfully' });
} catch (error) {
  console.error('Error deleting query:', error);
  res.status(500).json({ message: 'Error deleting query' });
}
});

module.exports = router;

