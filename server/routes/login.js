import express from 'express';
import { data } from '../database/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { rateLimit } from 'express-rate-limit';

const router = express.Router();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

router.use(limiter);

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = data.users.find((user) => user.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Hatalı Bilgi' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (username && password) {
    if (user && isPasswordValid) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          id: user.ID,
          premiumStatus: user.premiumStatus == 0 ? false : true,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '6h',
        }
      );
      res.json({
        message: 'Giriş Yapıldı',
        status: res.statusCode,
        user: {
          username: user.username,
          email: user.email,
          name: user.name,
          profilePicture: user.profilePicture,
          ID: user.ID,
          premiumStatus: user.premiumStatus == 0 ? false : true,
          token: token,
        },
      });
    } else {
      res.status(400).json({
        message: 'Hatalı Bilgi',
        status: res.statusCode,
      });
    }
  } else {
    res.status(400).send('Tüm alanların doldurulması zorunludur.');
  }
});

export default router;
