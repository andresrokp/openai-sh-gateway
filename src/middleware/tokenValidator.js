
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const bearerToken = req.body.bearerToken;
  // Verify the token and obtain user information
  try {
    const decoded = jwt.verify(bearerToken, 'your-secret-key');
    req.user = decoded;
    next(); // Token is valid
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};