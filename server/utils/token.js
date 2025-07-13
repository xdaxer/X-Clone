import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Giriş yapman gerekiyor.' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message:
          'Oturumun geçersiz veya süresi dolmuş. Lütfen tekrar giriş yap.',
      });
    }

    req.user = user;
    next();
  });
};

const verifyToken = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(user)
     return {
      user: user,
      verify: true
    };
  } catch (err) {
    return {
      user: null,
      verify: false
    };
  }
};

export { checkToken, verifyToken };
