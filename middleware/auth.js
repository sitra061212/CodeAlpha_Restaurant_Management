import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default function (requiredRole = null) {
  return function (req, res, next) {
    // Extract token from Authorization header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
      // Verify token and extract user info
      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      // If a specific role is required, check if the user has it
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ msg: 'Access denied. Insufficient permissions' });
      }

      next();
    } catch (err) {
      console.error('Token verification error:', err); 
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
}
