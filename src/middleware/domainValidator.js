
const { DOMAIN_URL } = process.env;

module.exports = (req, res, next) => {
  const clientDomain = req.headers.referer; // Extract the client's domain from the request headers
  if (clientDomain === DOMAIN_URL) {
    next(); // Client's domain is allowed
  } else {
    res.status(403).json({ error: 'Unauthorized domain' });
  }
};

