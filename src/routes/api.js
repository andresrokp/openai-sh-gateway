const express = require('express');
const router = express.Router();

router.post('/audiorequest', (req, res) => {
  // Handle income data and build a prompt
  console.log(req);
  // Send a query to OpenAI
  
  // Return the response
  res.json({ llmApiMsg: 'Response from OpenAI' });
});

module.exports = router;