import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.locals.user = user;
    console.log('Authentication successful');
    console.log('Authenticated user:', req.user);
    console.log('User: ', user);
    next();
  });
};

const adminCheck = (req, res, next) => {
  const user = res.locals.user;
  if (user.type === 'admin') {
    next();
  } else {
    res.status(403).json({error: 'Access forbidden'});
    return;
  }
};

export {authenticateToken, adminCheck};
