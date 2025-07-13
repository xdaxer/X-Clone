import express from 'express';
import { data } from '../database/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { rateLimit } from 'express-rate-limit';

const router = express.Router();

router.post('/', async (req, res) => {
  const token = req.body.token;

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message:
          'Oturumun geçersiz veya süresi dolmuş. Lütfen tekrar giriş yap.',
      });
    }

    res.send(true);
  });
});

export default router;
