import express from 'express';
import { data } from '../database/database.js';
import { insertData } from '../database/database.js';
import { rateLimit } from 'express-rate-limit';
import bcrypt from 'bcrypt';

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

router.use(limiter);

router.post('/', async (req, res) => {
  const { username, name, email, password, ID } = req.body;
  console.log(data.users);

  if (username && name && email && password) {
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Parola 8 Haneden Büyük Olmalıdır' });
    }

    if (data.users.find((user) => user.email === email)) {
      return res
        .status(400)
        .json({ message: 'Bu E-posta Adresiyle Zaten Bir Hesap Mevcut.' });
    }

    if (data.users.find((user) => user.username === username)) {
      return res
        .status(400)
        .json({ message: 'Bu Kullanıcı Adı Zaten Alınmış.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await insertData('Users', {
      username: username,
      name: name,
      password: hashedPassword,
      email: email,
      profilePicture: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 75)}.jpg`,
      bannerImage: `https://picsum.photos/id/${Math.floor(Math.random() * 75)}/1200/400`,
    });

    

    res.status(201).json({
      message: 'Hesabınız başarıyla oluşturuldu!',
     
    });
  } else {
    res.status(400).json({ message: 'Tüm alanların doldurulması zorunludur.' });
  }
});

export default router;
